import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCog, FaChartLine, FaArrowRight } from 'react-icons/fa';
import { IoMdNotificationsOutline } from 'react-icons/io';
import appertment from "../assets/appertment.svg";

const Home = () => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  // Sample statistics data
  const stats = [
    { value: '95%', label: 'Issues Resolved' },
    { value: '24h', label: 'Avg. Response Time' },
    { value: '4.8', label: 'Satisfaction Rating' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-center">
          <div className={`md:w-1/2 ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-700`}>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-4">
              Smart Maintenance <span className="text-indigo-600">Solutions</span> for Modern Apartments
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Streamline your residential maintenance process with our automated tracking system. 
              Faster resolutions, happier residents.
            </p>
            <div className="flex space-x-4">
              <Link 
                to="/register" 
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
              >
                Get Started <FaArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
          <div className={`md:w-1/2 mt-12 md:mt-0 ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-700 delay-150`}>
            <img 
              src={appertment} 
              alt="Maintenance illustration" 
              className="w-full max-w-md mx-auto rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-indigo-600 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className={`p-6 rounded-xl bg-white/10 backdrop-blur-sm ${animated ? 'opacity-100 scale-100' : 'opacity-0 scale-90'} transition-all duration-500 delay-${index * 200}`}
              >
                <p className="text-4xl font-bold mb-2">{stat.value}</p>
                <p className="text-indigo-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className={`bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-500`}>
            <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <IoMdNotificationsOutline className="text-indigo-600 text-xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Report Issues</h3>
            <p className="text-gray-600">
              Residents can easily report maintenance issues through our mobile-friendly platform.
            </p>
          </div>
          
          <div className={`bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-500 delay-150`}>
            <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <FaUserCog className="text-indigo-600 text-xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Assign Technicians</h3>
            <p className="text-gray-600">
              Admins automatically assign the right technician based on issue type and availability.
            </p>
          </div>
          
          <div className={`bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-500 delay-300`}>
            <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <FaChartLine className="text-indigo-600 text-xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Track & Resolve</h3>
            <p className="text-gray-600">
              Real-time tracking and automated notifications keep everyone informed until resolution.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-800 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Maintenance Process?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join hundreds of residential societies managing their maintenance efficiently with our system.
          </p>
          <Link 
            to="/register" 
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center"
          >
            Get Started Now <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8  text-center text-gray-500 text-sm ">
            © {new Date().getFullYear()} FixMate. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;