'use client'
import { Open_Sans ,Fahkwang} from 'next/font/google';
import { useState } from 'react';
import {CloudDownloadOutlined ,SendOutlined} from '@ant-design/icons';
import { UiChat } from '../../components/ui_chat'

// set fonts
const open_sans = Open_Sans({
    weight: ['300' ,'400' ,'500' ,'700'],
    subsets: ['latin']
})
const fahkwang = Fahkwang({
    weight: ['200' ,'300' ,'400' ,'500' ,'600','700'],
    subsets: ['thai' ,'latin']
})

function Home() {
    // this value will change based on our GitHub version.
    const [version, setVersion] = useState<string>('1.1.0');
    // value for setting topic chat ui
    const [selectedTopic, setSelectedTopic] = useState<number>(0);
    // query AI
    const [query ,setQuery] = useState<string>('');
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

    // <API> set data to AI
    const handleSubmitAIData = () => {
        try {
            // const response = CALL_SOME_API_TO_GET_VERSION;
        } catch (error) {
            console.log('Submit data error:', error);
        }
    }
    
    return (
    <div className={`w-screen h-screen ${fahkwang.className} overscroll-x-none overflow-x-hidden`}>
        <header className="flex flex-row w-full items-center text-white bg-black h-[7%] sticky top-0 z-10 px-4">
            <div>
                <div className="text-2xl font-semibold">Aimwarin</div>
            </div>
            <div className="flex flex-row cursor-pointer space-x-5 ml-auto">
                <div>Home</div>
                <div>About</div>
                <div>Blog</div>
                <div>Docs</div>
                <div>Download</div>
            </div>
        </header>
        <div className="w-full h-full">
            <div className="flex flex-wrap w-full h-full">
                <div className="flex flex-col h-full w-full p-10 items-center">
                    <div className="font-semibold text-7xl cursor-default">Aimwarin</div>
                    <div className="flex flex-col items-center w-full cursor-default">
                        <div className="my-2 text-center w-full lg:w-3/5">
                            Aimwarin-Chat 1.0.0 is an intelligent chatbot leveraging Graph RAG (Graph Retrieval-Augmented Generation) technology. By integrating advanced graph-based databases, the system organizes careers into categories and specific concepts.
                        </div>
                        {/* <ul className="list-disc mt-2">
                            <li>Deliver precise answers to complex, multi-step queries.</li>
                            <li>Extract data from reliable, authoritative sources.</li>
                            <li>Provide personalized career recommendations.</li>
                        </ul> */}
                    </div>
                    <div className="flex flex-row w-full h-full justify-center">
                        <div className="flex flex-col w-full lg:w-1/2  p-3 bg-black rounded-3xl">
                            <div className="flex flex-row bg-white w-full overflow-x-auto whitespace-nowrap h-auto px-2 rounded-t-2xl">
                                <div className="flex-none px-2 cursor-pointer">Topic 1</div>
                                <div className="flex-none px-2 cursor-pointer">Topic 2</div>
                                <div className="flex-none px-2 cursor-pointer">Topic 3</div>
                                <div className="flex-none px-2 cursor-pointer">Topic 4</div>
                                <div className="flex-none px-2 cursor-pointer">Topic 5</div>
                            </div>
                            <div className="flex  items-end justify-center w-full bg-slate-100 mt-2 grow p-2">
                                <div className="w-full">
                                    <div className="flex flex-row w-full justify-center">
                                        <input
                                            type="text"
                                            className="focus:outline-none focus:border border-red-400 py-1 px-2 rounded-2xl w-1/2"
                                        />
                                        <div className="flex justify-center bg-black text-white py-1 px-2 rounded-full mx-2 cursor-pointer">
                                            <SendOutlined />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row my-7 text-white bg-black py-3 rounded-xl px-5 max-w-max  cursor-pointer ">
                        <div className="mr-2">Download Aimwarin 1.1.0</div>
                        <CloudDownloadOutlined />
                    </div>
                </div>
                <div className="flex flex-col h-full w-full bg-green-300">
                    <div className="font-bold text-7xl">Aimwarin</div>
                    <div className="flex flex-row">
                        <button type='button'>Download Aimwarin 1.1.0</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home;