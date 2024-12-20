import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import Axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  
  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:1000/auth/forgot-Password", {
      email,
    })
      .then((res) => {
        if (res.data.status) {
          alert("Check your email for reset password link");
            navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center tracking-wider">
      <div className="w-11/12 sm:w-5/12 md:w-3/12 text-sm glass">
        <div className="w-full text-center my-3">
          <h1 className="text-2xl text-black font-medium">Reset Password</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
            <input
              type="email"
              placeholder="Enter Your Email Address"
              className="w-11/12 bg-transparent outline-none placeholder-black"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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
          
          <div className="my-7 py-2 px-5 flex justify-center">
            <button
              type="submit"
              className="w-10/12 h-[35px] bg-black text-white py-2 rounded"
              onClick={handleSubmit}
            >
              Send
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
