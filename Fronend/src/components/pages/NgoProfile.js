import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const NgoProfile = () => {
  const [ngoInfo, setNgoInfo] = useState({
    username: '',
    organizationName: '',
    email: '',
    phoneno: '',
    address: '',
    district: '',
    state: '',
    pincode: '',
  });

  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("ngosToken");

  useEffect(() => {
    if (token) {
      Axios.get("http://localhost:1000/ngosuser/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const data = response.data;
        localStorage.setItem("ngoName", data.organizationName);
        setNgoInfo({
          username: data.username || '',
          organizationName: data.organizationName || '',

          phoneno: data.phoneno || '',
          address: data.address || '',
          district: data.district || '',
          state: data.state || '',
          pincode: data.pincode || '',
        });
      })
      .catch((error) => {
        console.error("Error fetching NGO profile:", error);
      });
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNgoInfo({ ...ngoInfo, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    Axios.patch("http://localhost:1000/ngosuser/edit-profile",
       ngoInfo, {
      headers: { Authorization: `Bearer ${token}` },
      
    })
      .then((response) => {
        
        alert("Profile updated successfully");
        
      })
      .catch(() => { 
        alert("Error updating profile");
      })
      .finally(() => {  
        setLoading(false);
      });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center tracking-wider">
      <div className="w-10/12 sm:w-8/12 md:w-4/12 text-sm glass">
        <div className="w-full text-center my-3">
          <h1 className="text-2xl text-black font-medium">NGO Profile</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full bg-transparent outline-none placeholder-black"
              value={ngoInfo.username || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
            <input
              type="text"
              name="organizationName"
              placeholder="Organization Name"
              className="w-full bg-transparent outline-none placeholder-black"
              value={ngoInfo.organizationName || ""}
              onChange={handleChange}
            />
          </div>
          
          <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
            <input
              type="text"
              name="phoneno"
              placeholder="Phone Number"
              className="w-full bg-transparent outline-none placeholder-black"
              value={ngoInfo.phoneno || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="w-full bg-transparent outline-none placeholder-black"
              value={ngoInfo.address || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
            <input
              type="text"
              name="district"
              placeholder="District"
              className="w-full bg-transparent outline-none placeholder-black"
              value={ngoInfo.district || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
            <input
              type="text"
              name="state"
              placeholder="State"
              className="w-full bg-transparent outline-none placeholder-black"
              value={ngoInfo.state || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              className="w-full bg-transparent outline-none placeholder-black"
              value={ngoInfo.pincode || ""}
              onChange={handleChange}
            />
          </div>
          <div className="my-7 py-2 px-5 flex justify-center">
            <button
              type="submit"
              className="w-10/12 h-[35px] bg-black text-white py-2 rounded"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NgoProfile;
