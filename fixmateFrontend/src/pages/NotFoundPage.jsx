import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Main Content */}
      <main className="flex-grow flex flex-col md:flex-row items-center justify-center p-8 gap-12">
        {/* Text Content */}
        <div className="max-w-xl space-y-8 text-center md:text-left">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-4xl font-semibold">Lost in the digital cosmos</h2>
          <p className="text-gray-400 text-lg">
            The page you're looking for has drifted into the unknown. 
            Don't worry - we'll help you navigate back to familiar territory.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              to="/" 
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-medium hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Return Home
            </Link>
          </div>
        </div>

        {/* Illustration */}
        <div className="relative w-full max-w-md">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          
          <img 
            src="https://illustrations.popsy.co/amber/crashed-error.svg" 
            alt="404 illustration"
            style={{backgroundColor: "#ffe772"}}
            className="relative z-10 w-full h-auto max-h-96 object-contain rounded-3xl"
          />
        </div>
      </main>
    </div>
  );
};

export default NotFoundPage;