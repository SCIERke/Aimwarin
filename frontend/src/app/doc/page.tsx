'use client'
import { useRouter } from 'next/navigation'
import { Fahkwang} from 'next/font/google';
import { useState } from 'react';
import { DownOutlined, GithubOutlined } from '@ant-design/icons';
import Image from 'next/image'
import {Footer} from '@/components/footer'


const fahkwang = Fahkwang({
    weight: ['200' ,'300' ,'400' ,'500' ,'600','700'],
    subsets: ['thai' ,'latin']
})
export default function Doc() {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [timeReading ,setTimeReading] = useState<string>('');
    const [contact , setContact] = useState<string>('');

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };


    return (
        <div className={`w-screen h-screen ${fahkwang.className} overscroll-x-none overflow-x-hidden bg-white`}>
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
                    className="hover:bg-white px-2 py-1 rounded-sm hover:text-black"
                    onClick={() => router.push('/blog')}
                    >Blog</div>
                    <div className="bg-white px-2 py-1 rounded-sm text-black"
                    onClick={() => router.push('/doc')}
                    >Docs</div>
                    <div className="hover:bg-white px-2 py-1 rounded-sm hover:text-black ">Download</div>
                </div>
            </header>
            <div className="flex flex-col xl:flex-row w-full h-auto ">
                <div className=" p-2 visible xl:hidden ">
                    <div className="flex justify-center items-center p-2 border border-black rounded-xl cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                    >
                        <div>Select topic..</div>
                        <DownOutlined className="ml-2 text-sm"/>
                    </div>
                    {isOpen && (
                        <div
                        className="absolute left-0 mt-1 w-full bg-white border border-black z-50 p-2 rounded-xl flex flex-col justify-center items-center"
                        >
                            <div className="cursor-pointer hover:text-white hover:bg-black duration-500 py-1 px-40 rounded-xl">Option 1</div>
                            <div className="cursor-pointer hover:text-white hover:bg-black duration-500 py-1 px-40 rounded-xl">Option 2</div>
                            <div className="cursor-pointer hover:text-white hover:bg-black duration-500 py-1 px-40 rounded-xl">Option 3</div>
                        </div>
                    )}
                </div>
                <div className="xl:flex-col w-[20%] hidden xl:flex p-4 overflow-y-auto h-full">
                    <div className="text-md text-slate-600 mb-1">Introduction</div>
                    <div className="pl-7 text-sm mb-2">
                        <ul className="list-disc">
                            <li>Artificial Intelligence</li>
                            <li>Space Exploration</li>
                            <li>Quantum Computing</li>
                        </ul>
                    </div>
                    <div className="text-md text-slate-600 mb-1">Space Exploration</div>
                    <div className="pl-7 text-sm mb-2">
                        <ul className="list-disc">
                            <li>Mars Colonization</li>
                            <li>Astronomy Discoveries</li>
                            <li>Space Telescopes</li>
                        </ul>
                    </div>
                </div>
                <div className="w-full p-4 xl:w-[60%] xl:p-12 space-y-5  overflow-y-auto h-full">
                    <div className="text-black font-bold text-4xl">Introduction to Aimwarin</div>
                    <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.
                    </div>
                    <div>
                    Mauris massa. Vestibulum lacinia arcu eget nulla. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.
                    </div>
                    <div>
                    Integer in nulla vel arcu iaculis luctus. Ut laoreet ante sit amet ligula faucibus, et cursus sem scelerisque. Sed non ante ut lorem ullamcorper pharetra ut nec libero. Integer at mauris ut sapien suscipit pharetra non eu lacus
                    </div>
                    <div className="w-full flex flex-col items-center">
                        <Image
                            src="/rickroll.jpg"
                            width={500}
                            height={500}
                            alt="Picture of the author"
                            className="mb-2"
                        />
                        <div>This is the picture of your mom</div>
                    </div>

                </div>
                <div className="xl:flex-col  w-[20%] hidden xl:flex p-4 ">
                    <div className="mb-4">
                        <div className="text-sm text-slate-600 mb-1">Reading Time</div>
                        <div className="text-sm">{timeReading == '' ? "???" : timeReading} minutes</div>
                    </div>
                    <div className="mb-4">
                        <div className="text-sm text-slate-600">Authors</div>
                            {/* {images.map((image, index) => (
                                <img
                                key={index}
                                src={image}
                                alt={`Image ${index + 1}`}
                                className="w-full h-auto rounded-md"
                                />
                            ))} */}
                    </div>
                    <div className="mb-2">
                        <div className="text-sm text-slate-600 mb-1">Contribute</div>
                        <div className="flex flex-row ">
                            <GithubOutlined />
                            <a href={contact}>
                                <div className="ml-2 underline text-black text-sm">
                                  Contact us!  
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

