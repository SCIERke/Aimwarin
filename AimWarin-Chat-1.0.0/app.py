import pandas as pd 
import streamlit as st  # Add this import
import json
from openai import OpenAI
from pydantic import BaseModel, Field
from enum import Enum
from llama_index.graph_stores.neo4j import Neo4jPropertyGraphStore
import pickle
from streamlit_chat import message
from dotenv import load_dotenv
import os


client = OpenAI(api_key=st.secrets["OPENAI"])

# Define the model for handling keywords
class KeywordsModel(BaseModel):
    """
    This model represents the list or synonyms or related keywords related to the user query
    """
    keywords: list[str] = Field(
        description="Synonyms or related keywords used as a list of entity names to index a graph database"
    )

# Load and process data
df = pd.read_csv("combined_data.csv")
job_name = df['Job Name'].tolist()

# Define system prompt for generating synonyms
Symnonym_system_prompt = f"""
Given some initial query, generate synonyms or related keywords up to 10 in total, considering possible cases of pluralization, common expressions, etc.
The resulting list should be a list of entity names used to index a graph database. Here is the list of job names that already exist in the database: {', '.join(job_name)}
"""

# Initialize the Neo4j graph store
graph_store = Neo4jPropertyGraphStore(
    username="neo4j",
    password="llamaindex",
    url="bolt://54.151.202.198:7687",
)

# Load the pickle file
file_name = 'Full_community_data_job.pkl'
with open(file_name, 'rb') as file:
    summaries_dict, community_dict = pickle.load(file)

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

def get_related_nodes(nodes, graph_store):
    """Retrieve related nodes from the graph database."""
    triplets = graph_store.get_rel_map(nodes)
    related_nodes = []
    for triplet in triplets:
        related_nodes.append(triplet[0])
        related_nodes.append(triplet[-1])
    return related_nodes

def get_summaries_for_entity(entity_name, summaries_dict, community_dict):
    """Retrieve summaries for a specific entity."""
    if not summaries_dict or not community_dict:
        raise Exception('Missing summaries')

    if entity_name not in community_dict:
        return []

    communities = community_dict[entity_name]
    return [summaries_dict[c] for c in communities]

def answer_query(query, job_names, graph_store, summaries_dict, community_dict, history):
    """Generate an answer for the query using graph database and summaries."""
    # Include history in the context
    context_from_history = "\n".join([f"Q: {h['query']}\nA: {h['answer']}" for h in history])

    keywords = get_synonyms(query)
    nodes_keywords = graph_store.get(ids=keywords)
    related_nodes = get_related_nodes(nodes_keywords, graph_store)
    nodes_dict = {node.name: node for node in related_nodes}
    retrieved_entities = list(nodes_dict.values())

    all_summaries = set()
    for entity in retrieved_entities:
        summaries = get_summaries_for_entity(entity.name, summaries_dict, community_dict)
        all_summaries.update(summaries)

    context = "\n\n".join(all_summaries)

    graph_rag_system_prompt = f"""
    You are an assistant for question-answering tasks. Use the following pieces of retrieved context and past interactions to answer the question.
    If you don't know the answer, just say that you don't know. Use three sentences maximum and keep the answer concise.
    Only provide the answer and nothing else!

    Knowledge Graph:
    {nodes_keywords}

    CONTEXT FROM HISTORY:
    {context_from_history}

    Context:
    {context}

   
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",    
        messages=[
            {"role": "system", "content": graph_rag_system_prompt},
            {"role": "user", "content": f"QUERY: {query}"},
        ],
    )
    return response.choices[0].message.content

# Streamlit application
st.title("AimWaRin Chatbot 1.0.0")

def main():
    """Main function for Streamlit application."""
    # Initialize session state for conversation history
    if 'history' not in st.session_state:
        st.session_state.history = []
        # Add initial bot message
        st.session_state.history.append({"query": "Start", "answer": "สวัสดี! ผมคือแชทบอทด้านการแนะแนวอาชีพจากกราฟองค์ความรู้ มีอะไรให้ผมช่วยไหมครับ"})

    # Chat interface
    st.write("Original Database : https://wespace.in.th/")
    query = st.text_input("Your Query:")

    col1, col2 = st.columns(2)
    with col1:
        submit_button = st.button("✅ Submit", key="submit_button", help="Click to submit your query")
    with col2:
        reset_button = st.button("🔄 Reset Chat", key="reset_button", help="Click to reset the chat", on_click=lambda: st.session_state.update(history=[]))

    # Handle the Reset Chat button
    if reset_button:
        st.session_state.history = []  # Clear history
        st.session_state.history.append({"query": "Start", "answer": "สวัสดี! ผมคือแชทบอทด้านการแนะแนวอาชีพจากกราฟองค์ความรู้ มีอะไรให้ผมช่วยไหมครับ"})  # Add initial bot message

    if submit_button:
        if query:
            try:
                # Get the answer and update the conversation history
                answer = answer_query(query, job_name, graph_store, summaries_dict, community_dict, st.session_state.history)
                st.session_state.history.append({"query": query, "answer": answer})
            except Exception as e:
                st.error(f"An error occurred: {e}")
        else:
            st.warning("Please enter a query.")

    # Display the conversation history
    if st.session_state.history:
        st.write("---------------------------------------------------------------------------------------")
        for i, chat in enumerate(st.session_state.history):
            message(chat['query'], is_user=True, key=f"query_{i}")
            message(chat['answer'], is_user=False, key=f"answer_{i}")

if __name__ == "__main__":
    main()