import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from "./pages/Home"
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminDashboard from './pages/AdminDashboard'
import TechnicianDashboard from "./pages/TechnicianDashboard"

const App = () => {
  return (
    <div className='bg-black text-white w-screen h-screen box-border overflow-x-hidden'>
      <Routes>
        <Route path='/' element={<><Navbar /><Home /></>}/>
        <Route path='/dashboard' element={<><Navbar /><Dashboard /></>}/>
        <Route path='/admin-dashboard' element={<><Navbar /><AdminDashboard /></>}/>
        <Route path='/technician-dashboard' element={<><Navbar /><TechnicianDashboard /></>}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
      </Routes>
    </div>
  )
}

export default App