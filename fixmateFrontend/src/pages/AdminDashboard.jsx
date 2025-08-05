import { useContext, useMemo } from 'react';
import Table from '../components/Table'
import Chart from '../components/Chart';
import SideBar from '../components/SideBar';
import { AdminContext, AdminContextProvider } from '../context/AdminContext';

const AdminDashboardTemplate = ()=>{
  const { complaints, setComplaints, technicians } = useContext(AdminContext);

  const calculateComplaintsPiData = () => {
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
        color: 'indigo'
      }
    ];
  };

  const complaintsPidata = useMemo(() => {
    return calculateComplaintsPiData();
  }, [complaints]);

  const calculateTechniciansPiData = ()=>{
    let count = {
      busy: 0,
      available: 0,
      off_duty: 0,
    };

    technicians.forEach(item => {
      if (item.status === "AVAILABLE") count.available += 1;
      else if (item.status === "BUSY") count.busy += 1;
      else count.off_duty += 1;
    });

    const total = technicians.length || 1; // Avoid division by 0

    return [
      {
        value: 'Available',
        percent: parseFloat(((count.available / total) * 100).toFixed(2)),
        color: 'green'
      },
      {
        value: 'Busy',
        percent: parseFloat(((count.busy / total) * 100).toFixed(2)),
        color: 'orange'
      },
      {
        value: 'Off_Duty',
        percent: parseFloat(((count.off_duty / total) * 100).toFixed(2)),
        color: 'red'
      }
    ];
  }

  const techniciansPidata = useMemo(() => {
    return calculateTechniciansPiData();
  }, [technicians]);

  return (
    <div className='bg-gradient-to-br from-gray-500/30 to-blue-300/30 h-screen md:h-full rounded-2xl p-5 shadow-2xs flex flex-col gap-3'>
      <div className='bg-gradient-to-br from-violet-900/30 to-gray-800 p-2 rounded-2xl shadow-xl/30 flex flex-col md:flex-row gap-5'>
        <div className='flex-1/2 flex items-center'>
          <Chart data={complaintsPidata}/>
          <span className='border border-green-400 h-[70%] mx-2'></span>
          <div className='w-[60%]'>
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Complaint Status Overview</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              This pie chart displays the current status of all Complaints, categorized as <strong>Complete</strong>, <strong>Rejected</strong>, or <strong>Other</strong>.
            </p>
          </div>
        </div>
        <div className='flex-1/2 flex items-center'>
          <Chart data={techniciansPidata}/>
          <span className='border border-green-400 h-[70%] mx-2'></span>
          <div className='w-[60%]'>
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Technician Status Overview</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              This pie chart displays the current availability status of all technicians, categorized as <strong>Available</strong>, <strong>Busy</strong>, or <strong>Off Duty</strong>.
            </p>
          </div>
        </div>
      </div>
      <div className={`bg-gradient-to-br from-violet-900/30 to-gray-800 p-2 rounded-2xl h-[65%] shadow-xl/30 ${complaints.length===0?"flex justify-center items-center":""} overflow-y-auto`}>
        {
          complaints.length===0
          ? <div className='border text-center text-2xl bg-gradient-to-br from-blue-800 to-green-600 bg-clip-text text-transparent'>No Complaints to show</div>
          : <Table complaints={complaints} setComplaints={setComplaints} />
        }
      </div>
    </div>
  );
}

const AdminDashboard = () => {
  return (
    <AdminContextProvider>
      <SideBar Dashboard={AdminDashboardTemplate} tabs={["Dashboard", "Technicians"]}/>
    </AdminContextProvider>
  )
}

export default AdminDashboard