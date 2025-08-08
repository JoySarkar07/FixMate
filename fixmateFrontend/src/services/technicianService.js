import axios from "axios";

export const getAllTechnician = async ()=>{
  const token = JSON.parse(localStorage.getItem("authData")).token;
  const response = await axios.get(`http://localhost:8000/api/v1/admin/technician`,
      {
        headers : {
          "Authorization" : `Bearer ${token}`
        }
      }
    )
  return response.data;
}

export const getTechnicianById = async (technicianId)=>{
    const token = JSON.parse(localStorage.getItem("authData")).token;
    const response = await axios.get(`http://localhost:8000/api/v1/technician`,
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

export const updateTechnicianStatus = async (technicianId, status)=>{
  const token = JSON.parse(localStorage.getItem("authData")).token;
  const response = await axios.put(`http://localhost:8000/api/v1/technician/${technicianId}`, status,
      {
        headers : {
          "Authorization" : `Bearer ${token}`
        }
      }
    )
  return response.data;
}

export const registerTechnician = async (technicianData)=>{
  const response = await axios.post(`http://localhost:8000/api/v1/register/technician`, technicianData)
  return response.data;
}

export const deleteTechnicianById = async (technicianId)=>{
  const token = JSON.parse(localStorage.getItem("authData")).token;
  await axios.delete(`http://localhost:8000/api/v1/technician/${technicianId}`,
    {
      headers : {
        "Authorization" : `Bearer ${token}`
      }
    }
  )
}

export const getComplaintsCount = async ()=>{
  const token = JSON.parse(localStorage.getItem("authData")).token;
  const response = await axios.get(`http://localhost:8000/api/v1/technician/count`,
      {
        headers : {
          "Authorization" : `Bearer ${token}`
        }
      }
    )
  return response.data;
}

export const getComplaintsConuntById = async (technicianId)=>{
  const token = JSON.parse(localStorage.getItem("authData")).token;
  const response = await axios.get(`http://localhost:8000/api/v1/technician/${technicianId}`,
      {
        headers : {
          "Authorization" : `Bearer ${token}`
        }
      }
    )
  return response.data;
}