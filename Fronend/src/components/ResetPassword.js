import React, { useState } from "react";
import {  useNavigate , useParams} from "react-router-dom";
import Axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:1000/auth/reset-Password/"+token, {
      
      password,
    })
      .then((res) => {
        if (res.data.status) {
          alert("Password Reset Successfully");
            navigate("/login");
        }
        console.log(res.data);
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
              type="password"
              placeholder="Enter New Password"
              className="w-11/12 bg-transparent outline-none placeholder-black"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
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
          <div className="my-7 py-2 px-5 flex justify-center">
            <button
              type="submit"
              className="w-10/12 h-[35px] bg-black text-white py-2 rounded"
              onClick={handleSubmit}
            >
              Reset
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
