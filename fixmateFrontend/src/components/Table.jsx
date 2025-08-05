import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { deleteComplaintById, updateComplaintById } from "../services/complaintService";
import { useEffect, useRef, useState } from "react";

const Table = ({
  complaints = [],
  setComplaints,
  setCompaintData
}) => {
  const userData = useRef(JSON.parse(localStorage.getItem("authData"))??{});
  const [complaintsData, setcomplaintsData] = useState([]);
  const [filters, setFilters] = useState({
    statusType : "",
    technicianType : ""
  })

  useEffect(() => {
    const filterdData = complaints.filter(item=>{
      if(filters.technicianType==="NOT ASSIGNED YET")
        return item.status.match(filters.statusType) && item.technician===null;
      return item.status.match(filters.statusType);
    });
    setcomplaintsData(filterdData);
  }, [complaints, filters])


  const updateComplaintStatus = async (item, e)=>{
    try{
      const response = await updateComplaintById(item.complaintId, {status:e.target.value});
      const newComplaints = complaints.map(complaint=>{
        if(complaint.complaintId===item.complaintId) return response;
        return item;
      })
      setComplaints(newComplaints);
    }catch(e){
      console.log(e.message);
    }
  }

  const onFilterSelect = (e)=>{
    const {name, value} = e.target;
    setFilters(prev=>({
      ...prev,
      [name] : value
    }))
  }

  const updateComplaint = (compalint)=>{
    setCompaintData({
      complaintId : compalint.complaintId,
      title : compalint.title,
      description : compalint.description
    })
  }

  const getStatusBG = (status)=>{
      switch(status){
      case "AVAILABLE" : return "bg-green-800";
      case "BUSY" : return "bg-fuchsia-600";
      default : return "bg-red-600";
      }
  }

  const deleteComplaint = async (complaintId)=>{
    try{
      await deleteComplaintById(complaintId);
      const remainCompalints = complaints.filter(item=>item.complaintId!==complaintId);
      setComplaints(remainCompalints);
    }catch(e){
      console.log(e.message);
    }
  }

  const getStatusColumn = (item, role)=>{
    switch(role){
      case "TECHNICIAN" : 
        return <select name="status" id="status" onChange={(e)=>updateComplaintStatus(item, e)}>
          <option value={item.status}>{item.status}</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="RESOLVED">RESOLVED</option>
        </select>
      case "ADMIN" :
        return item.status==="RESOLVED" 
        ? <select name="status" id="status" onChange={(e)=>updateComplaintStatus(item, e)}>
            <option value={item.status}>{item.status}</option>
            <option value="CLOSED">CLOSED</option>
          </select>
        : item.status
      default : return item.status;
    }
  }


  const getUserOrTechnicianColumn = (item, role)=>{
    switch(role){
      case "ADMIN" :
        return <>
                {
                  item.technician
                  ? <td className="px-6 py-4">
                      <span className="flex gap-2">
                        {item.technician?.name}
                        <span className={`${getStatusBG(item.technician?.status)} p-1 rounded-4xl w-fit text-[10px] text-white`}>
                          {item.technician?.status}
                        </span>
                      </span>
                      <span>ID: {item.technician?.technicianId}</span>
                    </td>
                  : <td className="px-6 py-4">NOT ASSIGNED YET</td>
                }
                <td className="px-6 py-4 flex flex-col">
                  <span>{item.user?.username}</span>
                  <span>{item.user?.email}</span>
                  <span>
                    {item.user?.phone}
                  </span>
                </td>
              </>
      case "USER" :
        return item.technician
                  ? <td className="px-6 py-4 flex flex-col">
                      <span className="flex gap-2">
                        {item.technician?.name}
                        <span className={`${getStatusBG(item.technician?.status)} p-1 rounded-4xl w-fit text-[10px] text-white`}>
                          {item.technician?.status}
                        </span>
                      </span>
                      <span>ID: {item.technician?.technicianId}</span>
                    </td>
                  : <td className="px-6 py-4">NOT ASSIGNED YET</td> 
      case "TECHNICIAN" :
        return <td className="px-6 py-4 flex flex-col">
                  <span>{item.user?.username}</span>
                  <span>{item.user?.email}</span>
                  <span>
                    {item.user?.phone}
                  </span>
                </td>
      default : return "";
    }
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {
              userData.current.role==="ADMIN"
              ? <th scope="col" className="px-6 py-3">
                  Complaint Id
                </th>
              : <>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
              </>
            }
            <th scope="col" className="px-6 py-3">
              Status
              <select name="statusType" id="statusType" className="bg-black rounded-2xl ml-2" onChange={onFilterSelect}>
                <option value="">Select Filter</option>
                <option value="PENDING">PENDING</option>
                <option value="ASSIGNED">ASSIGNED</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="RESOLVED">RESOLVED</option>
                <option value="CLOSED">CLOSED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </th>
              {
                (userData.current.role==="TECHNICIAN" || userData.current.role==="ADMIN") && 
                  <th scope="col" className="px-6 py-3">TECHNICIAN
                    <select name="technicianType" id="technicianType" className="bg-black rounded-2xl ml-2" onChange={onFilterSelect}>
                      <option value="">Select Filter</option>
                      <option value="NOT ASSIGNED YET">NOT ASSIGNED YET</option>
                    </select>
                  </th>
              }
              {
                (userData.current.role==="USER" || userData.current.role==="ADMIN") && <th>USER</th>
              }
              {
                (userData.current.role==="USER" || userData.current.role==="ADMIN") && <th scope="col" className="px-6 py-3">Actions</th>
              }
          </tr>
        </thead>
        <tbody>
          {
            complaintsData.map((item, ind)=>{
              return <tr key={ind} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {userData.current.role==="ADMIN"?item.complaintId :item.title}
                </th>
                {userData.current.role!=="ADMIN" && <td className="px-6 py-4 max-w-[300px] break-words">{item.description}</td>}
                <td className="px-6 py-4">
                  {
                    getStatusColumn(item, userData.current.role)
                  }
                </td>
                {
                  getUserOrTechnicianColumn(item, userData.current.role)
                }
                {
                  (userData.current.role==="USER" || userData.current.role==="ADMIN") && <td className="px-6 py-4">
                                                      <div className="flex justify-center items-center gap-2">
                                                        <button 
                                                          className="cursor-pointer"
                                                          onClick={()=>deleteComplaint(item.complaintId)}
                                                        >
                                                          <MdDelete className="h-7 w-7 text-red-600"/>
                                                        </button>
                                                        {
                                                          userData.current.role==="USER" && <button 
                                                                                              className="cursor-pointer"
                                                                                              onClick={()=>updateComplaint(item)}
                                                                                            >
                                                                                              <FaRegEdit className="h-7 w-7 text-blue-500"/>
                                                                                            </button>
                                                        }
                                                      </div>
                                                    </td>
                }
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  );
};

export default Table;
