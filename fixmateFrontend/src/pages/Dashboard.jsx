import { useEffect, useMemo, useRef, useState } from 'react'
import SideBar from '../components/SideBar'
import Chart from '../components/Chart'
import Table from '../components/Table'
import { addComplaint, getUserComplaints, updateComplaintById } from '../services/complaintService'
import { getToastError, getToastSuccess } from '../services/toastService'

const UserDashboard = ()=>{
  const [complaints, setComplaints] = useState([]);
  const [complaintData, setComplaintData] = useState({
    complaintId: null,
    title: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userData = useRef(JSON.parse(localStorage.getItem("authData"))??{});
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setComplaintData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearForm = (e)=>{
    e.preventDefault();
    setComplaintData({
        complaintId: null,
        title: "",
        description: "",
    });
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (complaintData.complaintId === null) {
        const response = await addComplaint(userData.current.userId, complaintData);
        setComplaints((prev) => [ response, ...prev]);
        setComplaintData({
          complaintId : null,
          title: "",
          description: "",
        });
        getToastSuccess("New Complaint added successfully .");
      } else {
        const response = await updateComplaintById(
          complaintData.complaintId,
          complaintData
        );
        const updatedComplaints = complaints.map((item) => {
          if (item.complaintId === complaintData.complaintId) return response;
          return item;
        });
        setComplaints(updatedComplaints);
        setComplaintData({
          complaintId: null,
          title: "",
          description: "",
        });
        getToastSuccess("Complaint Updated Successfully .");
      }
    } catch (e) {
      getToastError("Error while adding or updating complaint .");
    } finally {
      setIsSubmitting(false);
    }
  };


  const calculatePiData = () => {
    let count = {
      closed: 0,
      cancelled: 0,
      other: 0,
    };

    complaints.forEach(item => {
      if (item.status === "CLOSED") count.closed += 1;
      else if (item.status === "CANCELLED") count.cancelled += 1;
      else count.other += 1;
    });

    const total = complaints.length || 1; // Avoid division by 0

    return [
      {
        value: 'Complete',
        percent: parseFloat(((count.closed / total) * 100).toFixed(2)),
        color: 'green'
      },
      {
        value: 'Rejected',
        percent: parseFloat(((count.cancelled / total) * 100).toFixed(2)),
        color: 'red'
      },
      {
        value: 'Other',
        percent: parseFloat(((count.other / total) * 100).toFixed(2)),
        color: 'yellow'
      }
    ];
  };

  const data = useMemo(() => {
    return calculatePiData();
  }, [complaints]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserComplaints(userData.current.userId);
        setComplaints(data);
      } catch (e) {
        getToastError("Error while fetching complaints .");
      }
    };

    fetchData(); 
  }, [])

  return (
    <div className='bg-gradient-to-br from-gray-500/30 to-blue-300/30 h-screen md:h-full rounded-2xl p-5 shadow-2xs flex flex-col gap-3'>
      <div className='flex gap-2'>
        <Chart data={data} message={complaints.length===0?"Chart is only vissible when some complaints is present":""}/>
        <div className="flex-1/2 bg-gradient-to-br from-violet-900/30 to-gray-800 p-2 rounded-2xl shadow-xl/30">
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col items-center gap-3"
        >
          <div className="flex flex-col gap-2 w-full">
            <input
              type="text"
              name="title"
              id="title"
              className="border border-gray-500 p-2 rounded-2xl"
              placeholder="Title for your problem"
              value={complaintData?.title}
              onChange={handleInputChange}
            />
            <textarea
              name="description"
              id="description"
              className="border border-gray-500 p-2 rounded-2xl flex-4/5"
              placeholder="A detailed description for your problem"
              value={complaintData?.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex">
              <button
              type="submit"
              className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer w-1/2"
              disabled={isSubmitting}
              >
              {isSubmitting ? "Submitting..." : "Submit"}
              </button>
              <button
              className="text-white bg-gradient-to-r from-amber-700 to-orange-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer w-1/2"
              disabled={isSubmitting}
              onClick={clearForm}
              >
              Clear
              </button>
          </div>
        </form>
      </div>
      </div>
      <div className={`bg-gradient-to-br from-violet-900/30 to-gray-800 p-2 rounded-2xl h-[65%] shadow-xl/30 ${complaints.length===0?"flex justify-center items-center":""} overflow-y-auto`}>
        {
          complaints.length===0
          ? <div className='border text-center text-2xl bg-gradient-to-br from-blue-800 to-green-600 bg-clip-text text-transparent'>No Complaints to show</div>
          : <Table complaints={complaints} setComplaints={setComplaints} setCompaintData={setComplaintData}/>
        }
      </div>
    </div>
  )
}

const Dashboard = () => {
  return (
    <SideBar Dashboard={UserDashboard} tabs={["Dashboard", "Technician"]}/>
  )
}

export default Dashboard