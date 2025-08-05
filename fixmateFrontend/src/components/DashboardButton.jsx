import { useNavigate } from "react-router-dom"

const DashboardButton = ({
    title,
    role
}) => {
    const navigate = useNavigate();
    const goToDashBoard = (role)=>{
        switch (role.toUpperCase()) {
            case 'ADMIN':
                navigate("/admin-dashboard");
                break;
            case 'TECHNICIAN':
                navigate("/technician-dashboard");
                break;
            default:
                navigate("/dashboard");
                break;
        }
    }
  return (
    <button className="button-85" role="button" onClick={()=>goToDashBoard(role)}>{title}</button>
  )
}

export default DashboardButton