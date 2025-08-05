import axios from "axios";


export const getUserComplaints = async (userId)=>{
  const token = JSON.parse(localStorage.getItem("authData")).token;
  const response = await axios.get(`http://localhost:8000/api/v1/complaint`,
      {
        params : {
          "userId" : `${userId}`
        },
        headers : {
          "Authorization" : `Bearer ${token}`
        }
      }
    )
  return response.data;
}

export const getTechnicianComplaints = async (technicianId)=>{
  const token = JSON.parse(localStorage.getItem("authData")).token;
  const response = await axios.get(`http://localhost:8000/api/v1/complaint`,
      {
        params : {
          "technicianId" : `${technicianId}`
        },
        headers : {
          "Authorization" : `Bearer ${token}`
        }
      }
    )
  return response.data;
}

export const getComplaintById = async (complaintId)=>{
  const token = JSON.parse(localStorage.getItem("authData")).token;
  const response = await axios.get(`http://localhost:8000/api/v1/complaint/${complaintId}`,
      {
        headers : {
          "Authorization" : `Bearer ${token}`
        }
      }
    )
  return response.data;
}

export const getAllComplaints = async ()=>{
  const token = JSON.parse(localStorage.getItem("authData")).token;
  const response = await axios.get(`http://localhost:8000/api/v1/complaint`,
      {
        headers : {
          "Authorization" : `Bearer ${token}`
        }
      }
    )
  return response.data;
}

export const addComplaint = async (userId, data)=>{
  const token = JSON.parse(localStorage.getItem("authData")).token;
  let complaintData = {...data, "userId":userId};
  delete complaintData.complaintId;
  const response = await axios.post(`http://localhost:8000/api/v1/complaint`, complaintData,
      {
        headers : {
          "Authorization" : `Bearer ${token}`
        }
      }
    )
  return response.data;
}

export const deleteComplaintById = async (complaintId)=>{
  const token = JSON.parse(localStorage.getItem("authData")).token;
  const response = await axios.delete(`http://localhost:8000/api/v1/complaint/${complaintId}`,
      {
        headers : {
          "Authorization" : `Bearer ${token}`
        }
      }
    )
  return response.data;
}

export const updateComplaintById = async (complaintId, data)=>{
  const token = JSON.parse(localStorage.getItem("authData")).token;
  console.log(complaintId);
  console.log(data);
  const response = await axios.put(`http://localhost:8000/api/v1/complaint/${complaintId}`, data,
      {
        headers : {
          "Authorization" : `Bearer ${token}`
        }
      }
    )
  return response.data;
}

