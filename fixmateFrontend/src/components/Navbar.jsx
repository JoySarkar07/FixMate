import { FaTools } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'
import { RxCross2, RxHamburgerMenu  } from "react-icons/rx";
import DashboardButton from "./DashboardButton";
import { useState } from "react";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const data = JSON.parse(localStorage.getItem("authData"));
  const navigate = useNavigate();
  
  const logout = ()=>{
    localStorage.removeItem("authData");
    navigate("/");
  }
  return (
    <nav className="bg-white shadow-sm">
      <div className={`container mx-auto px-6 py-4 flex ${openMenu?"flex-col":"items-center"} justify-between gap-2`}>
        <div className="flex w-full justify-between">
          <div className="flex items-center space-x-2">
            <img src="/logo.svg" alt="logo" className="h-10"/>
            <span className="text-xl font-bold text-indigo-800"><Link to="/">FixMate</Link></span>
          </div>
          {
            openMenu 
              ? <button className="md:hidden" onClick={()=>setOpenMenu(prev=>!prev)}><RxCross2 className="text-indigo-600 text-2xl" /></button>
              : <button className="md:hidden" onClick={()=>setOpenMenu(prev=>!prev)}><RxHamburgerMenu className="text-indigo-600 text-2xl" /></button>
          }
          
        </div>
        <div className={`${openMenu?"flex":"hidden"} md:flex items-center space-x-6`}>
          {
            localStorage.getItem("authData") && <DashboardButton title="Dashboard" role={data.role}/>                                 
          }
          {
            localStorage.getItem("authData") 
            ? <button className="text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer" onClick={logout}>Logout</button>
            : <Link to="/login" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Login
              </Link>
          }
          <Link 
            to="/register" 
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar