import React, { useContext, useState } from 'react'
import UserTable from './UserTable'
import { AdminContext } from '../context/AdminContext'
import { FaSearch } from 'react-icons/fa';
import { getComplaintById, updateComplaintById } from '../services/complaintService';

const Technicians = () => {
  const { technicians, complaints, setComplaints } = useContext(AdminContext);
  const [isSearching, setIsSearching] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [complaintId, setComplaintId] = useState("");
  const [technicianId, setTechnicianId] = useState("")
  const [complaintData, setComplaintData] = useState({
    complaintId : null,
    title: "",
    description : "",
    status : "",
  })

  const updateComplaint = async ()=>{
    if(technicianId==="") return;
    setIsUpdate(true);
    try{
      const response = await updateComplaintById(complaintData.complaintId, {technicianId, status:"ASSIGNED"})
      const updatedComplaints = complaints.map(com=>{
        if(com.complaintId===response.complaintId) return response;
        return com;
      })
      setComplaints(updatedComplaints);
    }catch(e){
      console.log(e.message);
    }finally{
      setIsUpdate(false);
    }
  }

  const searchComplaint = async ()=>{
    if(complaintId==="") return;
    setIsSearching(true);
    try{
      const response = await getComplaintById(complaintId);
      setComplaintData({
        complaintId : response.complaintId,
        title : response.title,
        description : response.description,
        status : response.status,
      })
      setComplaintId("");
    }catch(e){
      console.log(e);
    }finally{
      setIsSearching(false);
    }
  }

  return (
    <div className='bg-gradient-to-br from-gray-500/30 to-blue-300/30 h-screen md:h-full rounded-2xl p-5 shadow-2xs flex flex-col gap-3'>
        <div className='flex-1/2 bg-gradient-to-br from-violet-900/30 to-gray-800 p-2 rounded-2xl shadow-xl/30'>
            <div className='flex gap-3'>
              <input 
                  type="text" 
                  name="serchById" 
                  id="serchById"
                  className='flex-1 border border-gray-600 p-3 rounded-2xl'
                  placeholder='Enter complaint Id'
                  value={complaintId}
                  onChange={(e)=>setComplaintId(e.target.value)}
              />
              <button
                  className='bg-gradient-to-br from-amber-600 to-pink-800 hover:from-pink-800 hover:to-amber-600 px-5 py-3 rounded-2xl cursor-pointer shadow-xl/30 flex justify-center items-center gap-2'
                  disabled = {isSearching}
                  onClick={searchComplaint}
              >
                  <FaSearch />
                  {
                      isSearching ? "Searchning...." : "Search"
                  }
              </button>
            </div>
            <div className='flex flex-col gap-2 mt-2'>
              <span className='flex gap-2 items-center'>
                <span className='text-xl font-bold text-slate-500'>Title : </span>
                <h1 className='text-slate-400 bg-gradient-to-br from-gray-800 to-slate-900 p-2 rounded'>{complaintData.title}</h1>
              </span>
              <span className='flex gap-2'>
                <span className='text-xl font-bold text-slate-500'>Description : </span>
                <p className='flex-1 text-slate-400 bg-gradient-to-br from-gray-800 to-slate-900 p-2 rounded h-[70px] max-h-[70px] text-wrap'>{complaintData.description}</p>
              </span>
              <div className='flex gap-5'>
                <span className='flex gap-2 items-center'>
                  <span className='text-xl font-bold text-slate-500'>Status : </span>
                  <p className='text-slate-400 bg-gradient-to-br from-gray-800 to-slate-900 p-2 rounded'>{complaintData.status}</p>
                </span>
                <span className='flex gap-2 items-center'>
                  <span className='text-xl font-bold text-slate-500'>Technician : </span>
                  <input 
                    type="text" 
                    name='technicianId' 
                    id='technicianId'
                    placeholder='Enter technician Id'
                    className='text-slate-400 bg-gradient-to-br from-gray-800 to-slate-900 p-2 rounded'
                    disabled={isUpdate}
                    value={technicianId}
                    onChange={(e)=>setTechnicianId(e.target.value)}
                  />
                  <button
                    className='bg-gradient-to-br from-green-700 to-green-300 hover:from-cyan-300 hover:to-amber-600 px-5 py-3 rounded-2xl cursor-pointer shadow-xl/30 flex justify-center items-center gap-2'
                    onClick={updateComplaint}
                  >
                    {
                      isUpdate ? "Updating...": "Assign Technician"
                    }
                  </button>
                </span>
              </div>
            </div>
        </div>
        <div className={`bg-gradient-to-br from-violet-900/30 to-gray-800 p-2 rounded-2xl h-[65%] shadow-xl/30 ${technicians.length===0?"flex justify-center items-center":""} overflow-y-auto`}>
        {
          technicians.length===0
          ? <div className='border text-center text-2xl bg-gradient-to-br from-blue-800 to-green-600 bg-clip-text text-transparent'>No Complaints to show</div>
          : <UserTable data={technicians}/>
        }
      </div>
    </div>
  )
}

export default Technicians