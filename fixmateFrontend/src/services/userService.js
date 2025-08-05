import axios from "axios";


export const register = async (userData)=>{
    const response = await axios.post("http://localhost:8000/api/v1/register", userData);
    return response.data;
}

export const login = async (loginData)=>{
    const response = await axios.post("http://localhost:8000/api/v1/login", loginData);
    return response.data;
}