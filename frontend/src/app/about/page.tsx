'use client'
import { useRouter } from 'next/navigation'
import { Fahkwang } from 'next/font/google';
import { useState, useEffect } from 'react';
import './style.css';
import { LikeFilled, HeartFilled, SmileFilled, StarFilled, ThunderboltFilled } from '@ant-design/icons';
import { Footer } from '@/components/footer';

const randomTexts = [
  "Text 1!",
  "Text 2!",
  "Text 3!",
  "Text 4!",
  "Text 5!"
];

const randomIcons = [
  <LikeFilled className="text-4xl" />,
  <HeartFilled className="text-4xl" />,
  <SmileFilled className="text-4xl" />,
  <StarFilled className="text-4xl" />,
  <ThunderboltFilled className="text-4xl" />
];

const fahkwang = Fahkwang({
  weight: ['200', '300', '400', '500', '600', '700'],
  subsets: ['thai', 'latin']
})

export default function About() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [randomItems, setRandomItems] = useState<any[]>([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const getRandomItem = () => {
    const randomText = randomTexts[Math.floor(Math.random() * randomTexts.length)];
    const randomIcon = randomIcons[Math.floor(Math.random() * randomIcons.length)];
    return { text: randomText, icon: randomIcon };
  };

  // Set random items only after the component is mounted
  useEffect(() => {
    const items = [...Array(5)].map(() => getRandomItem());
    setRandomItems(items);
  }, []);

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
        <div className="flex flex-col xl:flex-row w-full h-auto p-10">
            <div className="w-full xl:w-[30%] p-10 space-y-10 ">
                <div className="font-semibold text-3xl">
                    Aimwarin's Team
                </div>
                <div>
                    I'm lazy to do this.
                </div>
                <div>
                    Peerapat Setsuk : FullStack Developer
                </div>
                <div>
                    Pasin Buakaw : AI Engineer / Backend Developer
                </div>
            </div>
            <div className="w-full xl:w-[70%] xl:p-10 space-y-5 xl:text-start border border-black rounded-xl">
                <div className="font-semibold text-3xl">
                    We Started From The School, Now We're Here
                </div>
                <div>
                    We Started From The School, Now We're Here" is a testament to the incredible journey of growth, perseverance, and transformation.
                </div>
                <div>
                    What began as a humble beginning in the school corridors, filled with dreams, aspirations, and the promise of the future, has blossomed into something much greater.
                </div>
                <div>
                    The experiences, challenges, and lessons learned along the way have shaped the path to where we are today—standing at the intersection of past efforts and future possibilities. From late-night study sessions to collaborative projects and inspiring mentors, the school years laid the foundation for success
                </div>
                <div className="overflow-hidden">
                    <div
                    style={{
                        animation: 'marquee 15s linear infinite',
                        whiteSpace: 'nowrap',
                    }}
                    className="flex flex-row space-x-16"
                    >
                        {randomItems.map((item, index) => (
                            <div key={index} className="flex flex-col items-center justify-center border-black border py-2 px-10 rounded-xl hover:text-white hover:bg-black duration-300">
                            {item.icon}
                            <div>{item.text}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="p-2" />
                <div className="font-semibold text-3xl">
                    Our Mission: Let's Change The World
                </div>
                <div>
                    At the heart of our mission is a deep commitment to creating positive change on a global scale. We believe that by coming together, we can address the most pressing challenges facing our world, from environmental issues to social inequality
                </div>
                <div>
                    Our goal is to inspire action, foster innovation, and empower individuals and communities to contribute toward building a brighter, more sustainable future.
                </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}
