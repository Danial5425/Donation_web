import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:1000/auth/signup", {
      username,
      email,
      password,
    
    })
      .then((res) => {
        // if registered successfully navigate to login
        if (res.data.status) {
          navigate("/mainlogin");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="w-full h-screen flex items-center justify-center tracking-wider">
      <div className="w-11/12 sm:w-6/12 md:w-4/12 text-sm glass">
        <div className="w-full text-center my-3">
          <h1 className="text-2xl text-black font-bold sm:font-medium sm:text-4xl md:text-4xl">
            Register
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
            <input
              type="text"
              placeholder="Enter Your Name"
              className="w-11/12 bg-transparent outline-none placeholder-black"
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="w-2/12 items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
            <input
              type="email"
              placeholder="Enter Your Email Address"
              className="w-11/12 bg-transparent outline-none placeholder-black"
              onChange={(e) => setEmail(e.target.value)}
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
              placeholder="Create a Strong Password"
              className="w-11/12 bg-transparent outline-none  placeholder-black"
              onChange={(e) => setPassword(e.target.value)}
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
          
          <div className=" my-7 py-2 px-5 flex justify-center">
            <button className="w-10/12 h-[35px] bg-black text-white py-2 rounded">
              Register
            </button>
          </div>
          <Link
            to="/login"
            className="mx-5 my-7 py-2 flex justify-center cursor-pointer"
          >
            <p className="text-sm">Already have an account?/Login</p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
