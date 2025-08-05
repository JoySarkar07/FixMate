import { createContext, useEffect, useState } from "react";
import { getAllComplaints } from "../services/complaintService";
import { getAllTechnician } from "../services/technicianService";


export const AdminContext = createContext(null);

export const AdminContextProvider = (props)=>{
    const [complaints, setComplaints] = useState([]);
    const [technicians, setTechnicians] = useState([]);

    useEffect(() => {
        async function fetchComplaints(){
        try{
            const respsonse = await getAllComplaints();
            const technicians = await getAllTechnician();
            setComplaints(respsonse);
            setTechnicians(technicians);
        }catch(e){
            console.log(e.message);
        }
        }

        fetchComplaints();
        
    }, [])


    const contextValue = {
        complaints,
        setComplaints,
        technicians,
        setTechnicians
    }
    return (
        <AdminContext.Provider value={contextValue}>
            {props.children}
        </AdminContext.Provider>
    );
}