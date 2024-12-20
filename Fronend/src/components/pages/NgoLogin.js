import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";


const NgoLogin = ({ setIsUserSignedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error message
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [success, setSuccess] = useState(""); // State for success message
  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    setSuccess(""); // Reset success message
    setLoading(true); // Start loading

    try {
      const res = await Axios.post("http://localhost:1000/ngosuser/ngoslogin", {
        email,
        password,
      });
      if (res.data.status) {
        localStorage.setItem("ngosToken", res.data.token);
        
        
        
        localStorage.setItem('user', JSON.stringify({ role: 'ngo' }));

        setIsUserSignedIn(true);
        setSuccess("Login successful! Redirecting..."); // Set success message
        setTimeout(() => navigate("/"), 2000); // Redirect after 2 seconds
      } else {
        setError("Invalid email or password."); // Set error message
      }
    } catch (err) {
      console.log(err);
      setError("Login failed. Please try again."); // Set error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12 bg-white rounded-lg shadow-lg p-5">
        <h1 className="text-2xl text-center font-medium text-black mb-4">Login</h1>
        
        {/* Display success message */}
        {success && <div className="text-green-500 text-center mb-2">{success}</div>}
        
        {/* Display error message */}
        {error && <div className="text-red-500 text-center mb-2">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Enter Your Email Address"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required // Add required attribute
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Enter Your Password"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required // Add required attribute
            />
          </div>
          <div className="mb-4 flex justify-end">
            <Link to={"/forgotpassword"} className="text-blue-600 hover:underline">Forgot password?</Link>
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full h-10 bg-black text-white rounded transition duration-200 hover:bg-gray-800"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Logging in..." : "Login"} {/* Change button text */}
            </button>
          </div>
          <div className="text-center">
            <Link
              className="text-blue-600 hover:underline"
              to="/ngosignup"
            >
              Don't have an account? / NGO'S Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NgoLogin;
