'use client'
import { useRouter } from 'next/navigation'
import { Fahkwang} from 'next/font/google';
import { useState } from 'react';



const fahkwang = Fahkwang({
    weight: ['200' ,'300' ,'400' ,'500' ,'600','700'],
    subsets: ['thai' ,'latin']
})

export default function About() {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState<boolean>(false);

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
                    className="bg-white px-2 py-1 rounded-sm text-black"
                    onClick={() => router.push('/about')}
                    >About</div>
                    <div
                    className="hover:bg-white px-2 py-1 rounded-sm hover:text-black"
                    onClick={() => router.push('/blog')}
                    >Blog</div>
                    <div className="hover:bg-white px-2 py-1 rounded-sm hover:text-black "
                    onClick={() => router.push('/doc')}
                    >Docs</div>
                    <div className="hover:bg-white px-2 py-1 rounded-sm hover:text-black ">Download</div>
                </div>
            </header>
            <div>
                about
            </div>
        </div>
    )
}
