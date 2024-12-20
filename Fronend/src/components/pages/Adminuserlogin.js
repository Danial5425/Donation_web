import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import backgroundImage from '../../assets/loginbg1.jpg';

const Adminuser = ({ setIsUserSignedIn, isUserSignedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error message
  const [loading, setLoading] = useState(false); // State for loading indicator
  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    setLoading(true); // Start loading
   

    try {
      const res = await Axios.post("http://localhost:1000/admin/admin-login", {
        email,
        password,
      });

      if (res.data.status) {
        // Store the token in localStorage
        if (res.data.token) {
          localStorage.setItem("adminToken", res.data.token);
          localStorage.setItem('user', JSON.stringify({ role: 'Adminuser' }));

          
        }
        
        setIsUserSignedIn(true);
        navigate("/"); // Redirect to home on success
      } else {
        setError("Invalid email or password"); // Set error message
      }
    } catch (err) {
      console.log(err);
      setError("Login failed. Please try again."); // Set error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center tracking-wider" style={{
      backgroundImage: `url(${backgroundImage})`, // Apply the background image from assets
      backgroundPosition: "center", // Center the background image
      backgroundSize: "cover", // Ensure the image covers the full screen
    }}>
      <div className="w-10/12 sm:w-/12 md:w-3/12 text-sm glass">
        <div className="w-full text-center my-3">
          <h1 className="text-2xl text-black font-medium">Admin login</h1>
        </div>
        {error && <div className="text-red-500 text-center">{error}</div>} {/* Display error message */}
        <form onSubmit={handleSubmit}>
          <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
            <input
              type="email"
              placeholder="Enter Your Email Address"
              className="w-11/12 bg-transparent outline-none placeholder-black"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required // Add required attribute
            />
            <div className="w-2/12 items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
              </svg>
            </div>
          </div>
          <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
            <input
              type="password"
              placeholder="Enter Your Password"
              className="w-11/12 bg-transparent outline-none placeholder-black"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required // Add required attribute
            />
            <div className="w-2/12 items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 fill-black"
              >
                <path
                  fillRule="evenodd"
                  d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="mx-5 my-7 py-2 flex items-center justify-end cursor-pointer tracking-wider">
            <Link to={"/forgotpassword"}><p>Forgot password?</p></Link>
          </div>
          <div className="my-7 py-2 px-5 flex justify-center">
            <button
              type="submit"
              className="w-10/12 h-[35px] bg-black text-white py-2 rounded"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Logging in..." : "Login"} {/* Change button text */}
            </button>
          </div>
          <Link
            className="mx-5 my-7 py-2 flex justify-center cursor-pointer"
            to="/signup"
          >
            <p className="text-sm">Don't have an account? / Register</p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Adminuser;
