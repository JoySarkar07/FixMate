import { FaSearch } from "react-icons/fa";
import businessMan from "../assets/businessMan.svg";
import { useState } from "react";
import { getTechnicianById } from "../services/technicianService";
import { getToastError, getToastSuccess } from "../services/toastService";

const DetailsFinder = () => {
    const [userId, setUserId] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [user, setUser] = useState({
        technicianId : "",
        name: "John Doe",
        skill: "Plumber",
        email: "example@gmail.com",
        phone: "0123456789",
        role: "TECHNICIAN",
        status: "AVAILABLE"
    })

    const getTechnician = async ()=>{
        if(userId==="") return;
        setIsSearching(true);
        try{
            const response = await getTechnicianById(userId);
            setUser(response);
            setUserId("");
            getToastSuccess("Technician Found");
        }catch(e){
            getToastError("Technician not found .");
        }finally{
            setIsSearching(false);
        }
    }

    const getStatusBG = (status)=>{
        switch(status){
        case "AVAILABLE" : return "bg-green-800";
        case "BUSY" : return "bg-fuchsia-600";
        default : return "bg-red-600";
        }
    }
  return (
    <div className='bg-gradient-to-br from-gray-500/30 to-blue-300/30 h-screen md:h-full rounded-2xl p-5 shadow-2xs flex flex-col gap-3'>
        <div className='bg-gradient-to-br from-violet-900/30 to-gray-800 p-5 rounded-2xl shadow-xl/30 flex items-center gap-5'>
            <input 
                type="text" 
                name="serchById" 
                id="serchById"
                className='flex-1 border border-gray-600 p-3 rounded-2xl'
                placeholder='Enter technician Id Know about this technician'
                value={userId}
                onChange={(e)=>setUserId(e.target.value)}
            />
            <button
                className='bg-gradient-to-br from-amber-600 to-pink-800 hover:from-pink-800 hover:to-amber-600 px-5 py-3 rounded-2xl cursor-pointer shadow-xl/30 flex justify-center items-center gap-2'
                onClick={getTechnician}
                disabled = {isSearching}
            >
                <FaSearch />
                {
                    isSearching ? "Searchning...." : "Search"
                }
            </button>
        </div>
        <div className="flex-1/2 max-h-[90%] bg-gradient-to-br from-violet-900/30 to-gray-800 p-2 rounded-2xl shadow-xl/30 flex gap-5">
            <div className="hidden md:block w-auto h-auto">
                <img 
                    src={businessMan} 
                    alt="businessman svg"
                    className="rounded-3xl object-cover w-full h-full"
                />
            </div>
            <div className="flex-1/2 p-6 bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-md rounded-xl shadow-md">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">User Details</h2>
                
                <div className="space-y-4">
                    <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
                        <span className="text-lg font-medium text-gray-600">Name</span>
                        <span className="text-xl font-semibold text-gray-800">{user.name}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
                        <span className="text-lg font-medium text-gray-600">Email</span>
                        <span className="text-xl font-semibold text-gray-800 break-all">{user.email}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
                        <span className="text-lg font-medium text-gray-600">Phone</span>
                        <span className="text-xl font-semibold text-gray-800">{user.phone}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
                        <span className="text-lg font-medium text-gray-600">Role</span>
                        <span className="text-xl font-semibold text-gray-800">{user.role}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
                        <span className="text-lg font-medium text-gray-600">Skill</span>
                        <span className="text-xl font-semibold text-gray-800">{user.skill}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
                        <span className="text-lg font-medium text-gray-600">Status</span>
                        <span className={`text-xl font-semibold ${getStatusBG(user.status)} px-3 py-1 rounded-full`}>
                            {user.status}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DetailsFinder