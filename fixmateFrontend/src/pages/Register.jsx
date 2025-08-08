import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaTools, FaArrowRight } from 'react-icons/fa';
import RegisterUserSvg from "../assets/register_user.svg";
import CheckBox from '../components/CheckBox';
import { registerTechnician } from '../services/technicianService';
import { register } from '../services/userService';
import { getToastError, getToastSuccess } from '../services/toastService';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    skill: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [isTechnician, setIsTechnician] = useState(false);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const clearFrom = ()=>{
    setFormData({
      name: '',
      skill: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    })
  }

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (isTechnician && !formData.skill.trim()) newErrors.skill = 'Skill is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone must be 10 digits';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try{
        if(isTechnician){
          const technicianData = formData;
          delete technicianData.confirmPassword;
          await registerTechnician(technicianData);
        }else{
          const userData = formData;
          delete userData.confirmPassword;
          delete userData.skill;
          await register(userData);
        }
        clearFrom();
        getToastSuccess("New user registered successfully .");
      }catch(e){
        getToastError("Error occure while registering new User .");
      }finally{
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex text-black">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-500 to-indigo-600 items-center justify-center p-12">
        <div className="max-w-md">
          <h2 className="text-white text-3xl font-bold mb-4">Join Our Maintenance Network</h2>
          <p className="text-blue-100 mb-8">
            Become part of our efficient apartment maintenance system. Get connected with residents and streamline your workflow.
          </p>
          <img 
            src={RegisterUserSvg}
            alt="Maintenance illustration"
            className="w-full h-auto rounded-2xl"
          />
          <div className="mt-8 flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <FaTools className="text-white text-xl" />
            </div>
            <div>
              <h4 className="text-white font-medium">Quick Assignments</h4>
              <p className="text-blue-100 text-sm">Get matched with maintenance requests instantly</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8 sm:p-12 lg:p-16">
        <div className="w-full max-w-md">
          <div className="flex items-center mb-8">
            <FaTools className="text-indigo-600 text-2xl mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">FixMate</h1>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Your Account</h2>
          <p className="text-gray-600 mb-8">Register to start managing maintenance requests</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`pl-10 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-200'
                  }`}
                  placeholder="John Doe"
                />
              </div>
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`pl-10 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-200'
                  }`}
                  placeholder="john@gmail.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`pl-10 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.phone ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-200'
                  }`}
                  placeholder="1234567895"
                />
              </div>
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`pl-10 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-200'
                  }`}
                  placeholder="At least 4 characters"
                />
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`pl-10 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.confirmPassword ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-200'
                  }`}
                  placeholder="Confirm your password"
                />
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
            </div>
            <div className='flex gap-3'>
              <CheckBox onChange={()=>setIsTechnician(prev=>!prev)} value={isTechnician}/> <span>I am a technician .</span>
            </div>

            {
              isTechnician && <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Skill/Profession</label>
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaTools className="text-gray-400" />
                                  </div>
                                  <input
                                    type="text"
                                    name="skill"
                                    value={formData.skill}
                                    onChange={handleChange}
                                    className={`pl-10 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                                      errors.skill ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-200'
                                    }`}
                                    placeholder="Plumber"
                                  />
                                </div>
                                {errors.skill && <p className="mt-1 text-sm text-red-600">{errors.skill}</p>}
                              </div>
            }

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  Register Now <FaArrowRight className="ml-2" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign in
              </Link>
            </p>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Go To {' '}
              <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                Home
              </Link>
              {' '}Page
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;