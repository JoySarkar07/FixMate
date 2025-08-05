import { FaCircleUser } from "react-icons/fa6";
import { useState } from "react";
import { MdDoubleArrow } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import DetailsFinder from "./DetailsFinder";
import Technicians from "./Technicians";

const getTabView = (Dashboard, selectedTab)=>{
    switch(selectedTab){
        case "Technician" : return <DetailsFinder />
        case "Technicians" : return <Technicians />
        default :
            return <Dashboard />;
    }
}

const SideBar = ({
    Dashboard,
    tabs=[]
}) => {
    const [selectedTab, setSelectedTab] = useState("Dashboard");
    const [openSideBar, setOpenSideBar] = useState(false);
    const userData = JSON.parse(localStorage.getItem("authData"));
    return (
        <div className='flex h-[calc(100%-80px)]'>
            <div className={`${openSideBar?"absolute h-[calc(100%-80px)]":"hidden"} md:block md:flex-1/5 bg-linear-to-br/decreasing from-gray-800 to-teal-800 rounded-2xl p-5 z-10`}>
                {
                    openSideBar && <button className="flex w-full justify-end" onClick={()=>setOpenSideBar(false)}>
                        <RxCross2 className="text-indigo-600 text-2xl" />
                    </button>
                }
                <div className='flex flex-col justify-center items-center gap-4'>
                    <FaCircleUser className='h-20 w-20' />
                    <div>
                        <span>{userData?.email}</span>
                        <span className="m-1 bg-gradient-to-br from-cyan-400 to-indigo-400 p-2 rounded-3xl text-[12px] font-bold text-black">{userData?.role}</span>
                    </div>
                </div>
                <hr className='my-5'/>
                <div className='flex flex-col gap-2'>
                    {
                        tabs.map(item=>{
                            return (
                                <div key={item} className='bg-gradient-to-r from-gray-500 to-blue-900 hover:from-blue-900 hover:to-gray-500 p-2 rounded-2xl cursor-pointer'
                                    onClick={()=>setSelectedTab(item)}
                                >
                                    {item}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='flex-4/5'>
                <button className="h-10 w-10 md:hidden rounded-4xl bg-sky-800 flex justify-center items-center absolute" 
                    onClick={()=>setOpenSideBar(true)}
                >
                    <MdDoubleArrow />
                </button>
                {
                    getTabView(Dashboard, selectedTab)
                }
            </div>
        </div>
    )
}

export default SideBar