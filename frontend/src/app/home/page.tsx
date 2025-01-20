'use client'
import { Fahkwang} from 'next/font/google';
import { useState } from 'react';
import {CloudDownloadOutlined ,
    CoffeeOutlined,
    DiscordOutlined,
    DollarOutlined,
    FacebookOutlined,
    LinkOutlined,
    MailOutlined,
    PhoneOutlined,
    QuestionCircleOutlined,
    SendOutlined} from '@ant-design/icons';
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import "./style.css";
import {Footer} from '@/components/footer'
import axios from 'axios';



// set fonts
const fahkwang = Fahkwang({
    weight: ['200' ,'300' ,'400' ,'500' ,'600','700'],
    subsets: ['thai' ,'latin']
})

function Home() {
    const [query, setQuery] = useState<string>('');
    const [response, setResponse] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);



    const handleSubmitAIData = async () => {
        if (!query.trim()) {
        setError('Query cannot be empty!');
        return;
        }
        setError(null); // Clear previous errors

        try {
        const res = await axios.post(
            'http://127.0.0.1:8000/query',
            { query }, // Pass the query in the request body
            { headers: { 'Content-Type': 'application/json' } } // Correct headers
        );
        // setResponse(res.data.response); // Update state with API response
        console.log(res.data.response);
        setResponse(res.data.response);
        } catch (err) {
        console.error('Submit data error:', err);
        setError('Failed to fetch data. Please try again.');
        }
    };
    //intialize app rounter
    const router = useRouter()
    // this value will change based on our GitHub version.
    const [version, setVersion] = useState<string>('1.1.0');
    // value for setting topic chat ui
    const [selectedTopic, setSelectedTopic] = useState<number>(0);
    // query AI
    
    // stores response from AI
    const [airesponse , setAIResponse] = useState<string>('');

    // <API> update the version when the app starts
    const handleChangeVersion = () => {
        try {
            // const response = CALL_SOME_API_TO_GET_VERSION;
        } catch (error) {
            console.log('Setting version error:', error);
        }
    }

    // Set Topic selecting 
    const handleChangeTopic = () => {
        
    }

    
    return (
    <div className={`w-screen h-screen ${fahkwang.className} overflow-x-hidden`}>
        <header className="flex flex-row w-full items-center text-white bg-black py-1 sticky top-0 z-10 px-4">
            <div>
                <div className="text-2xl font-semibold">Aimwarin</div>
            </div>
            <div className="flex flex-row cursor-pointer space-x-1 ml-auto text-md">
                <div className="bg-white px-2 py-1 rounded-sm text-black ">Home</div>
                <div
                className="hover:bg-white px-2 py-1 rounded-sm hover:text-black"
                onClick={() => router.push('/about')}
                >About</div>
                <div
                className="hover:bg-white px-2 py-1 rounded-sm hover:text-black"
                onClick={() => router.push('/blog')}
                >Blog</div>
                <div className="hover:bg-white px-2 py-1 rounded-sm hover:text-black"
                onClick={() => router.push('/doc')}>Docs</div>
                <div className="hover:bg-white px-2 py-1 rounded-sm hover:text-black ">Download</div>
            </div>
        </header>
        <div className="w-full h-auto">
            <div className="flex flex-wrap w-full h-full">
                <div className="flex flex-col h-full w-full p-10 items-center">
                    <div className="font-semibold text-7xl cursor-default">Aimwarin</div>
                    <div className="flex flex-col items-center w-full cursor-default">
                        <div className="my-2 description w-full lg:w-3/5">
                            Aimwarin-Chat 1.0.0 is an intelligent chatbot leveraging Graph RAG (Graph Retrieval-Augmented Generation) technology. By integrating advanced graph-based databases, the system organizes careers into categories and specific concepts.
                        </div>
                    </div>
                    <div className="flex flex-row flex-wrap w-full h-full justify-center">
                        <div className="flex flex-col w-full  lg:w-1/2  p-3 border border-black rounded-3xl ">
                            <div className="flex flex-row bg-white w-full overflow-x-auto whitespace-nowrap h-auto px-2 rounded-t-2xl ">
                                <div className="flex-none px-2 cursor-pointer">Topic 1</div>
                                <div className="flex-none px-2 cursor-pointer">Topic 2</div>
                                <div className="flex-none px-2 cursor-pointer">Topic 3</div>
                                <div className="flex-none px-2 cursor-pointer">Topic 4</div>
                                <div className="flex-none px-2 cursor-pointer">Topic 5</div>
                            </div>
                            <div className="flex  items-end justify-center w-full bg-slate-100 mt-2 grow py-2 px-4 border-black border rounded-2xl h-auto">
                                <div className="w-full ">
                                <div className="flex flex-col w-full h-full">
                                {response && <div className="mt-4 p-2 bg-green-100 typing-animation">{response}</div>}
                                </div>
                                    <div className="flex flex-row w-full justify-center mt-2">
                                        <input
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)} // Update state on change
                                            type="text"
                                            className="focus:outline-none border  focus:border-red-400 py-1 px-2 rounded-2xl w-1/2"
                                            placeholder='Type something..'
                                        />
                                        <div className="flex justify-center text-white py-1 px-2 rounded-full mx-2 cursor-pointer bg-black hover:opacity-80 duration-200" onClick={handleSubmitAIData}>
                                            <SendOutlined />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="margin_smallbox lg:ml-2 flex flex-col lg:w-[12%] w-full h-full border border-black rounded-2xl p-2 items-center">
                            <div className="flex sm:flex-row xl:flex-col border border-black rounded-2xl p-2 w-full justify-center items-center hover:text-white hover:bg-black cursor-pointer duration-500">
                                    <LinkOutlined className="sm:text-4xl"/>
                                <div className="ml-2 xl:ml-0">API Docs</div>
                            </div>
                            <div className="flex sm:flex-row xl:flex-col border border-black rounded-2xl p-2 w-full justify-center items-center hover:text-white hover:bg-black cursor-pointer duration-500 mt-2 ">
                                    <QuestionCircleOutlined className="sm:text-3xl"/>
                                <div className="ml-2 xl:ml-0">Policy</div>
                            </div>
                            <div className="flex sm:flex-row xl:flex-col border border-black rounded-2xl p-2 w-full justify-center items-center hover:text-white hover:bg-black cursor-pointer duration-500 mt-2 ">
                                    <DiscordOutlined className="sm:text-4xl"/>
                                <div className="ml-2 xl:ml-0">Join us</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row my-7 text-white bg-black  py-3 rounded-xl px-5 max-w-max  cursor-pointer hover:opacity-80 duration-200 ">
                        <div className="mr-2">Download Aimwarin 1.1.0</div>
                        <CloudDownloadOutlined />
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
    </div>
  )
}

export default Home;