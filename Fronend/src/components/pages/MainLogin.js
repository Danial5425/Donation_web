import React from "react";
import { useNavigate } from "react-router-dom";

// Import the background image from the assets folder
import backgroundImage from "../../assets/loginbg1.jpg";

const MainLogin = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Apply background image
      }}
    >
      {/* Dark Overlay to make content readable */}
      {/* <div className="absolute w-full h-full bg-black opacity-50"></div> */}

      {/* Login options */}
      <div className=" glass relative z-10 flex flex-col items-center justify-center w-full max-w-lg p-6 bg-white bg-opacity-80 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-8 text-black">Welcome Back</h1>
        <h2 className="text-2xl font-bold mb-8 text-gray-900">Login As</h2>
        <div className="space-y-4 w-full">
          <button
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
            onClick={() => navigate("/login")}
          >
            Donor
          </button>
          <button
            className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
            onClick={() => navigate("/ngologin")}
          >
            NGO
          </button>
          <button
  className="w-full py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
  onClick={() => navigate('/adminuser-login')}
>
  Admin
</button>


        </div>
      </div>
    </div>
  );
};

export default MainLogin;
