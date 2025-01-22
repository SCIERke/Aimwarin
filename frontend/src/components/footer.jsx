import {
    CoffeeOutlined,
    DollarOutlined,
    FacebookOutlined,
    MailOutlined,
    PhoneOutlined,
    GithubOutlined,
    QuestionCircleOutlined,
    BugOutlined } from '@ant-design/icons';

export function Footer() {
    return (
        <div className="border-t border-black w-full">
            <footer className="flex flex-wrap h-full w-full">
                <div className="p-3 flex flex-row  w-full xl:w-auto">
                    <CoffeeOutlined className="text-7xl"/>
                    <div className="flex flex-col ml-4">
                        <div className="font-medium mb-2">Care to buy us a coffee?</div>
                        <div className="text-smx">
                        You can support us using the button below.
                        </div>
                        <div className="px-16">
                            <div className="flex justify-center items-center py-2 mt-2 text-sm bg-black   text-white rounded-2xl hover:opacity-80 duration-200 cursor-pointer">
                                Donate
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full xl:w-auto py-3 px-7 flex-col border-black border-t xl:border-t-0">
                    <div className="font-medium mb-2">Get in touch</div>
                    <div className="flex flex-row ">
                        <MailOutlined />
                        <div className="ml-5 text-sm">Aimwarin@hello.com</div>
                    </div>
                    <div className="flex flex-row ">
                        <PhoneOutlined />
                        <div className="ml-5 text-sm">+1 (555) 867-5309</div>
                    </div>
                    <div className="flex flex-row ">
                        <FacebookOutlined />
                        <div className="ml-5 text-sm">Aimwarin Official</div>
                    </div>
                </div>
                <div className="py-3 flex-col px-10 cursor-pointer border-black border-t xl:border-t-0 w-full xl:w-auto">
                    <div className="font-medium mb-2">Encounter Issues?</div>
                    <div className="flex flex-col border-black border p-2 justify-center items-center rounded-2xl hover:bg-black hover:text-white duration-500">
                        <DollarOutlined className="text-4xl"/>
                        <div className="text-sm mt-2">Send us for reward</div>
                    </div>
                </div>
                <div className="w-full xl:w-auto py-3 flex-col cursor-pointer border-black border-t xl:border-t-0 px-12">
                    <div className="font-medium mb-2 ">Help</div>
                    <div className="flex flex-row w-full ">
                        <GithubOutlined className="text-xl mr-4"/>
                        <div className="text-sm">Github</div>
                    </div>
                    <div className="flex flex-row  mt-1">
                        <QuestionCircleOutlined className="text-xl mr-4"/>
                        <div className="text-sm">FAQ</div>
                    </div>
                    <div className="flex flex-row  mt-1">
                        <BugOutlined className="text-xl mr-4"/>
                        <div className="text-sm">Bug Report</div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
