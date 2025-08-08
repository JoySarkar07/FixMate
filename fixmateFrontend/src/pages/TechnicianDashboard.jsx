import { useEffect, useRef, useState } from 'react'
import SideBar from '../components/SideBar'
import { getTechnicianComplaints } from '../services/complaintService';
import Table from '../components/Table';
import { getComplaintsConuntById, getTechnicianById, updateTechnicianStatus } from '../services/technicianService';
import { getToastError, getToastSuccess } from '../services/toastService';

const TechDashboard = ()=>{
  const [complaints, setComplaints] = useState([]);
  const [status, setStatus] = useState("AVAILABLE");
  const [count, setCount] = useState(0);
  const userData = useRef(JSON.parse(localStorage.getItem("authData"))??{});

  const changeStatus = async (e) =>{
    try{
      const status = e.target.value;
      await updateTechnicianStatus(userData.current.userId, {status});
      setStatus(status);
      getToastSuccess("Your availability status changed successfully .");
    }catch(e){
      getToastError("Error while updating your availability status .");
    }
  }

  useEffect(() => {
    async function fetchComplaints(){
      try{
        const response = await getTechnicianComplaints(userData.current.userId);
        const technicianResponse = await getTechnicianById(userData.current.userId);
        const responseCount = await getComplaintsConuntById(userData.current.userId);
        setComplaints(response);
        setStatus(technicianResponse.status);
        setCount(responseCount);
      }catch(e){
        getToastError("Error fetching technician details .");
      }
    }

    fetchComplaints();
  }, [])
  
  return (
    <div className='bg-gradient-to-br from-gray-500/30 to-blue-300/30 h-screen md:h-full rounded-2xl p-5 shadow-2xs flex flex-col gap-3'>
      <div className='bg-gradient-to-br from-violet-900/30 to-gray-800 p-2 rounded-2xl shadow-xl/30 flex items-center gap-2'>
        <span className='border border-green-400 ml-3 mr-1 h-full'></span>
        <span className="text-sm font-medium text-gray-600 whitespace-nowrap">
          <h2 className="text-2xl font-bold text-white mb-2">Update Your Availability</h2>
          <p className="text-gray-600">Let your team know your current working status</p>
        </span>
        <select
          name="yourStatus"
          id="yourStatus"
          className="px-4 py-2 bg-gradient-to-br from-gray-700 to-slate-500 rounded-4xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all appearance-none cursor-pointer"
          value={status}
          onChange={changeStatus}
        >
          <option value="AVAILABLE" className="bg-green-50 text-green-700">🟢 Available</option>
          <option value="BUSY" className="bg-yellow-50 text-yellow-700">🟡 Busy</option>
          <option value="OFF_DUTY" className="bg-red-50 text-red-700">🔴 Off Duty</option>
        </select>
        <p className="text-xs text-gray-500 mt-2">
          Your status will be visible to your team members and may affect task assignments.
        </p>
        <span className='border border-green-400 ml-3 mr-1 h-full'></span>
        <div className='flex gap-3 items-center'>
          Total Complaints : <div className='bg-black p-2 w-[70px] rounded-2xl'>{count}</div>
        </div>
      </div>
      <div className={`flex-1/2 bg-gradient-to-br from-violet-900/30 to-gray-800 p-2 rounded-2xl shadow-xl/30 ${complaints.length===0?"flex justify-center items-center":""} overflow-y-auto`}>
        {
          complaints.length===0
          ? <div className='border text-center text-2xl bg-gradient-to-br from-blue-800 to-green-600 bg-clip-text text-transparent'>No Complaints to show</div>
          : <Table complaints={complaints} setComplaints={setComplaints} />
        }
      </div>
    </div>
  );
};

const TechnicianDashboard = () => {
  return (
    <SideBar Dashboard={TechDashboard} tabs={["Dashboard"]}/>
  )
}

export default TechnicianDashboard