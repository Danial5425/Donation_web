import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../assets/loginbg1.jpg';// Ensure this path is correct

const MainSignup = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Apply the background image from assets
        backgroundPosition: "center", // Center the background image
        backgroundSize: "cover", // Ensure the image covers the full screen
      }}
    >
      {/* Optional dark overlay for better readability */}
      {/* <div className="absolute w-full h-full bg-black opacity-50"></div> */}

      {/* Main content container */}
      <div className=" glass relative z-10 flex flex-col items-center justify-center w-full max-w-lg p-6 bg-white bg-opacity-80 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">Sign Up As</h2>
        <div className="space-y-4 w-full">
          {/* Donor button */}
          <button
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
            onClick={() => navigate('/signup')}
          >
            Donor
          </button>
          {/* NGO button */}
          <button
            className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
            onClick={() => navigate('/ngosignup')}
          >
            NGO
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainSignup;
