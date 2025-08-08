import { useContext, useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { deleteTechnicianById, getComplaintsCount } from '../services/technicianService';
import { AdminContext } from '../context/AdminContext';
import { IoCopy } from 'react-icons/io5';
import toast from 'react-hot-toast';
import { getToastError, getToastSuccess } from '../services/toastService';

const technicianTypes = [
  "Electrician",
  "Plumber",
  "AC Mechanic",
  "Carpenter",
  "Painter",
  "Refrigerator Technician",
  "Washing Machine Technician",
  "Elevator Technician",
  "CCTV Technician",
  "Generator Technician",
  "Computer Technician",
  "Mobile Technician",
  "Network Technician",
  "Solar Panel Technician",
  "Boiler Technician"
];


const UserTable = ({
    data = []
}) => {
    const { setTechnicians } = useContext(AdminContext);
    const [filteredData, setFilteredData] = useState([]);
    const [count, setCount] = useState({});
    const [filters, setFilters] = useState({
        skillType : "",
        statusType : ""
    })

    useEffect(() => {
      async function fetchComplaintsCount(){
        try{
            const response = await getComplaintsCount();
            setCount(response);
        } catch(e){
            getToastError("Error fetchning count");
        }
      }

      fetchComplaintsCount();
    }, [])
    

    useEffect(() => {
        const filterData = data.filter(item=>item.skill.match(filters.skillType) && item.status.match(filters.statusType))
        setFilteredData(filterData);
    }, [data, filters])

    const onFilterChange = (e)=>{
        const {name, value} = e.target;
        setFilters(prev=>({
            ...prev,
            [name] : value
        }))
    }

    const deleteTechnician = async (technicianId)=>{
        if(count[technicianId] > 0){
            getToastError(`Removal is not allowed as this technician is currently assigned to ${count[technicianId]} tasks.`);
            return;
        }
        try{
            await deleteTechnicianById(technicianId);
            setTechnicians(prev=>prev.filter(item=>item.technicianId!==technicianId));
            getToastSuccess("Technician removed .");
        }catch(e){
            getToastError("Error while removing technician .");
        }
    }
    

    const getStatusText = (status)=>{
        switch(status){
            case "AVAILABLE" : return "text-green-600";
            case "BUSY" : return "text-amber-500";
            default : return "text-red-600";
        }
    }

    const getDotedId = (id="")=>{
        return id.substring(0, 5)+"*****";
    }

    const copyTechnicianId = (technicianId)=>{
        navigator.clipboard.writeText(technicianId);
        getToastSuccess("Id coppied successfully !!!");
    }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Technician ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Details
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Skill
                        <select name="skillType" id="skillType" className="bg-black rounded-2xl ml-2" onChange={onFilterChange}>
                            <option value="">Select Filter</option>
                            {
                                technicianTypes.map((item, ind)=>{
                                    return <option key={ind} value={item}>{item}</option>;
                                })
                            }
                        </select>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Status
                        <select name="statusType" id="statusType" className="bg-black rounded-2xl ml-2" onChange={onFilterChange}>
                            <option value="">Select Filter</option>
                            <option value="AVAILABLE">AVAILABLE</option>
                            <option value="BUSY">BUSY</option>
                            <option value="OFF_DUTY">OFF_DUTY</option>
                        </select>
                    </th>
                    <th>
                        Assigned Complaints
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    filteredData.map( (item, ind) => {
                        return <tr key={ind} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className='flex gap-2'>
                                            {
                                                getDotedId(item.technicianId)
                                            }
                                            <button className="cursor-pointer" onClick={()=>copyTechnicianId(item.technicianId)}><IoCopy className="w-5 h-5 hover:text-blue-500"/></button>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4 flex flex-col">
                                        <span>{item.name}</span>
                                        <span>{item.email}</span>
                                        <span>{item.phone}</span>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-white">
                                        {
                                            item.skill
                                        }
                                    </td>
                                    <td className={`px-6 py-4 ${getStatusText(item.status)} font-bold`}>
                                        {
                                            item.status
                                        }
                                    </td>
                                    <td className="px-6 py-4">
                                        {
                                            <span className='font-bold'>{count[item.technicianId]??0}</span>
                                        }
                                    </td>
                                    <td className="px-6 py-4">
                                        <button 
                                            className="cursor-pointer"
                                            onClick={()=>deleteTechnician(item.technicianId)}
                                        >
                                            <MdDelete className="h-7 w-7 text-red-600"/>
                                        </button>
                                    </td>
                                </tr>
                    })
                }
            </tbody>
        </table>
    </div>
  )
}

export default UserTable