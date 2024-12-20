import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Donatebtn = () => {
  const [name, setName] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [type_of_donation, setType_of_donation] = useState("");
  const [quantity, setQuantity] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:1000/donate", {
      name,
      phoneno,
      type_of_donation,
      quantity,
      address,
      district,
      state,
      pincode,
    })
      .then((res) => {
        if (res.status === 201) {
          alert("Donation added successfully");
          navigate("/");
        } else {
          alert(res.data.message || "Something went wrong. Please try again.");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("An error occurred. Please check the console for details.");
      });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center tracking-wider">
      <div className="w-11/12 sm:w-6/12 md:w-4/12 text-sm glass">
        <div className="w-full text-center my-3">
          <h1 className="text-2xl text-black font-bold sm:font-medium sm:text-4xl md:text-4xl">
            Donate Form
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
            <input
              type="text"
              placeholder="Enter Your Name"
              className="w-11/12 bg-transparent outline-none placeholder-black"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
            <input
              type="number"
              placeholder="Enter Your phone Number"
              className="w-11/12 bg-transparent outline-none placeholder-black"
              onChange={(e) => setPhoneno(e.target.value)}
            />
          </div>
          <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
            <input
              type="text"
              placeholder="Enter Type of doantion "
              className="w-11/12 bg-transparent outline-none placeholder-black"
              onChange={(e) => setType_of_donation(e.target.value)}
            />
          </div>
          <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
            <input
              type="text"
              placeholder="Enter Quantity"
              className="w-11/12 bg-transparent outline-none placeholder-black"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
            <input
              type="text"
              placeholder="Enter address"
              className="w-11/12 bg-transparent outline-none placeholder-black"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
            <input
              type="text"
              placeholder="Enter district"
              className="w-11/12 bg-transparent outline-none placeholder-black"
              onChange={(e) => setDistrict(e.target.value)}
            />
          </div>
          <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
            <input
              type="text"
              placeholder="Enter state"
              className="w-11/12 bg-transparent outline-none placeholder-black"
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
            <input
              type="number"
              placeholder="Enter pincode"
              className="w-11/12 bg-transparent outline-none placeholder-black"
              onChange={(e) => setPincode(e.target.value)}
            />
          </div>
          <div className=" my-7 py-2 px-5 flex justify-center">
            <button className="w-10/12 h-[35px] bg-black text-white py-2 rounded">
              Donate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Donatebtn;
