import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from "./pages/Home"
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminDashboard from './pages/AdminDashboard'
import TechnicianDashboard from "./pages/TechnicianDashboard"
import { Toaster } from 'react-hot-toast'
import NotFoundPage from './pages/NotFoundPage'

const App = () => {

  const ProtectedRoute = ({element, allowedRoles})=>{
    if(!localStorage.getItem("authData")){
      return <Navigate to={"/login"} replace/>;
    }
    if(allowedRoles && !allowedRoles.includes(JSON.parse(localStorage.getItem("authData")).role)){
      return <Navigate to={"/not-found"} replace/>;
    }
    return element;
  }

  return (
    <div className='bg-black text-white w-screen h-screen box-border overflow-x-hidden'>
      <Toaster />
      <Routes>
        <Route path='/' element={<><Navbar /><Home /></>}/>
        <Route path='/dashboard' element={<ProtectedRoute element={<><Navbar /><Dashboard /></>} allowedRoles={["USER"]} />}/>
        <Route path='/admin-dashboard' element={<ProtectedRoute element={<><Navbar /><AdminDashboard /></>} allowedRoles={["ADMIN"]} />}/>
        <Route path='/technician-dashboard' element={<ProtectedRoute element={<><Navbar /><TechnicianDashboard /></>} allowedRoles={["TECHNICIAN"]}/>}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='*' element={<NotFoundPage />}/>
      </Routes>
    </div>
  )
}

export default App