from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from openai import OpenAI
from llama_index.graph_stores.neo4j import Neo4jPropertyGraphStore
from fastapi.middleware.cors import CORSMiddleware
import pickle
import pandas as pd
from dotenv import load_dotenv
import os   


load_dotenv()
api_key = os.getenv("OPENAI")
client = OpenAI(api_key=api_key)


# Initialize FastAPI app
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust origins as needed
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],
)

# Load and process data
df = pd.read_csv("combined_data.csv")
job_name = df['Job Name'].tolist()

# Load the pickle file
file_name = 'Full_community_data_job.pkl'
with open(file_name, 'rb') as file:
    summaries_dict, community_dict = pickle.load(file)

# Initialize the Neo4j graph store
graph_store = Neo4jPropertyGraphStore(
    username="neo4j",
    password="llamaindex",
    url="bolt://54.151.202.198:7687",
)

class KeywordsModel(BaseModel):
    keywords: list[str]

class QueryModel(BaseModel):
    query: str


Symnonym_system_prompt = f"""
Given some initial query, generate synonyms or related keywords up to 10 in total, considering possible cases of pluralization, common expressions, etc.
The resulting list should be a list of entity names used to index a graph database. Here is the list of job names that already exist in the database: {', '.join(job_name)}
"""




# Function to generate synonyms
def get_synonyms(query):
    """Fetch synonyms or related keywords for a given query."""
    completion = client.beta.chat.completions.parse(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": Symnonym_system_prompt},
            {"role": "user", "content": f"QUERY: {query}"},
        ],
        response_format=KeywordsModel,
    )
    keywords_model = completion.choices[0].message.parsed
    return [k.capitalize() for k in keywords_model.keywords]



# Function to get related nodes from the graph store
def get_related_nodes(nodes, graph_store):
    triplets = graph_store.get_rel_map(nodes)
    related_nodes = []
    for triplet in triplets:
        related_nodes.append(triplet[0])
        related_nodes.append(triplet[-1])
    return related_nodes

# Function to get summaries for a specific entity
def get_summaries_for_entity(entity_name, summaries_dict, community_dict):
    if entity_name not in community_dict:
        return []
    communities = community_dict[entity_name]
    return [summaries_dict[c] for c in communities]
def summarycontext(query,context):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": 
"Summarize the context concisely in no more than 3 sentences, ensuring all critical information, such as numbers and specific names, is preserved accurately and aligns with the provided input.In thai language"},
            {"role": "user", "content": f"QUERY: {query} , CONTEXT: {context}"},
        ],
    )
    return response.choices[0].message.content

# Function to answer the query
def answer_query(query):
    try:
        synonyms = get_synonyms(query)
        nodes_keywords = graph_store.get(ids=synonyms)
        related_nodes = get_related_nodes(nodes_keywords, graph_store)

        nodes_dict = {node.name: node for node in related_nodes}
        retrieved_entities = list(nodes_dict.values())

        all_summaries = set()
        for entity in retrieved_entities:
            summaries = get_summaries_for_entity(entity.name, summaries_dict, community_dict)
            all_summaries.update(summaries)

        context = "\n\n".join(all_summaries)
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": (
            "You are an assistant for question-answering tasks. Use the following pieces of retrieved context and "
            "past interactions to answer the question. If you don't know the answer, just say that you don't know. "
            "Use three sentences maximum and keep the answer concise. Only provide the answer and nothing else!\n\n"
            f"Knowledge Graph:\n{nodes_keywords}\n\n"
            f"Context:\n{context}"
        )
},
                {"role": "user", "content": f"QUERY: {query}"},
            ],
        )
        return response.choices[0].message.content
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing query: {str(e)}")


@app.post("/query")
async def process_query(query_model: QueryModel):
    query = query_model.query
    if not query:
        raise HTTPException(status_code=400, detail="Query cannot be empty")

    try:
        response = answer_query(query)
        return {"query": query, "response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI Query Processor!"}