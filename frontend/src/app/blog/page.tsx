'use client'
import { useRouter } from 'next/navigation'
import { Fahkwang} from 'next/font/google';
import { useState } from "react";
import {ImportOutlined} from '@ant-design/icons';
import { Footer } from '@/components/footer';

const fahkwang = Fahkwang({
    weight: ['200' ,'300' ,'400' ,'500' ,'600','700'],
    subsets: ['thai' ,'latin']
})

export default function Blog() {
    const router = useRouter();

    const [selected, setSelected] = useState('');

    const topics = ["Topic A", "Topic B", "Topic C", "Topic D", "Topic E"];
    interface Blog_Card {
        name: string;
        genre: string;
        description: string;
        image_blob: string;
    }

    // Example data. In a complete website, we will fetch this data from the database instead.
    const blogs_card :Blog_Card[] = [  
        {
            name: "How Aimwarin change the world?",
            genre: "Topic A",
            description: "Aimwarin represents a transformative force that drives innovation, progress, and positive change across various sectors.",
            image_blob: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/2wBDAAoHBwkJCAg"
        },
        {
            name: "The Impact of Innovative Technology",
            genre: "Topic B",
            description: "Innovative technology has reshaped industries, enabling breakthroughs in efficiency, automation, and creativity",
            image_blob: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/2wBDAAoHBwkJCAgLCgsLDw8Q"
        },
        {
            name: "Towards a Sustainable Future",
            genre: "Topic C",
            description: "Sustainable development focuses on meeting the needs of the present without compromising the ability of future .",
            image_blob: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/2wBDAAoHBwkJCAgMCwsNDQwN"
        },
        {
            name: "Advancing Global Health",
            genre: "Topic D",
            description: "Global health is crucial to the well-being of populations across the world.",
            image_blob: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/2wBDAAoHBwkJCAgMDQ8Q"
        },
        {
            name: "The Future of Work in a Digital World",
            genre: "Topic E",
            description: "The future of work is being shaped by digital transformation. ",
            image_blob: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/2wBDAAoHBwkJCAgODg8P"
        },
        {
            name: "Space Exploration: Pushing the Boundaries",
            genre: "Space Exploration",
            description: "Space exploration continues to push the boundaries of human knowledge.",
            image_blob: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/2wBDAAoHBwkJCAgKCw8Q"
        },
    ]
    return (
        <div className={`w-screen h-screen ${fahkwang.className} overscroll-x-none overflow-x-hidden`}>
            <header className="flex flex-row w-full items-center text-white bg-black py-1 sticky top-0 z-10 px-4">
                <div>
                    <div className="text-2xl font-semibold">Aimwarin</div>
                </div>
                <div className="flex flex-row cursor-pointer space-x-1 ml-auto text-md">
                    <div className="hover:bg-white px-2 py-1 rounded-sm hover:text-black"
                    onClick={() => router.push('/home')}>Home</div>
                    <div
                    className="hover:bg-white px-2 py-1 rounded-sm hover:text-black"
                    onClick={() => router.push('/about')}
                    >About</div>
                    <div
                    className="bg-white px-2 py-1 rounded-sm text-black"
                    onClick={() => router.push('/blog')}
                    >Blog</div>
                    <div className="hover:bg-white px-2 py-1 rounded-sm hover:text-black "
                    onClick={() => router.push('/doc')}
                    >Docs</div>
                    <div className="hover:bg-white px-2 py-1 rounded-sm hover:text-black ">Download</div>
                </div>
            </header>
            <div className=" w-full h-auto flex flex-col py-10 px-2 xl:py-10 xl:px-40">
                <div className="xl:px-5">
                    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between justify-center ">
                        <div className="text-5xl font-bold ">Blogs</div>
                        <div className="text-sm w-full xl:w-[30%] mt-3 xl:mt-0">Curiosity is the fuel that drives innovation and creativity. In a world that’s constantly </div>
                    </div>
                    <div className="flex flex-row bg-white w-full xl:w-[30%] mt-4 rounded-full border-gray-500 border ">
                        <input
                            type="text"
                            id="search"
                            name="search"
                            placeholder='Enter the topic...'
                            className="focus:outline-none w-[70%] xl:w-[75%]  py-2 px-3 rounded-full"
                        />
                        <div className="flex justify-center items-center w-[30%] xl:w-[25%] bg-black rounded-full py-2 px-3">
                            <div className="text-white cursor-pointer">search</div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row w-auto h-auto p-2 overflow-x-auto  mt-3 space-x-4 text-black border-b border-black">
                    <div className="flex flex-row flex-nowrap space-x-4 overflow-x-auto">
                        {topics.map((topic, index) => (
                            <div
                                key={index}
                                onClick={() => setSelected(topic)}
                                className={`px-6 py-2 rounded-full cursor-pointer flex items-center justify-center text-center whitespace-nowrap
                                    ${
                                        selected === topic
                                            ? "bg-black text-white"
                                            : "hover:bg-black hover:text-white border border-black duration-500"
                                    }`}
                            >
                                {topic}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-wrap p-4 justify-center">
                    {blogs_card.map((blog, index) => (
                        <div className="flex flex-col xl:mr-4 w-full mb-4 xl:w-[32%] border-black border rounded-3xl" key={index}>
                            <div className="bg-gray-900 py-10 rounded-t-3xl">
                                <img src={blog.image_blob} alt={blog.name} />
                            </div>
                            <div className=" p-8 flex flex-col">
                                <div className="text-lg font-semibold">{blog.name}</div>
                                <div className="text-gray-500 text-sm">Topic: {blog.genre}</div>
                                <div className=" text-sm text-start mt-2">{blog.description}</div>
                                <div className="flex flex-row mt-2 justify-center space-x-4">
                                    <div className="flex flex-wrap py-1 px-3  border-black border rounded-full items-center cursor-pointer hover:shadow-lg hover:shadow-gray-200">
                                        <div>View more</div>
                                        <ImportOutlined className="text-xs ml-2"/>
                                    </div>
                                    <div className="flex flex-row bg-black text-white py-1 px-3 rounded-full items-center cursor-pointer">
                                        <div>Favourite</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer/>
        </div>
    )
}

