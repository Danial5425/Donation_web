import React, { useEffect, useState } from "react";
import Axios from "axios";

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    dateOfBirth: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (token) {
      Axios.get("http://localhost:1000/auth/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          const data = response.data;
          setUserInfo({
            fullName: data.fullName || "",
            email: data.email || "",
            dateOfBirth: data.dateOfBirth || "",
            phoneNumber: data.phoneNumber || "",
            address: data.address || "",
            city: data.city || "",
            state: data.state || "",
            pincode: data.pincode || "",
          });
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    Axios.patch(
      "http://localhost:1000/auth/edit-profile", // Ensure backend supports PATCH
      userInfo,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
      
    )
      .then((response) => {
        alert("Profile updated successfully");
      })
      .catch((error) => {
        alert("Error updating profile");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center tracking-wider">
      <div className="w-10/12 sm:w-/12 md:w-4/12 text-sm glass">
        <div className="w-full text-center my-3">
          <h1 className="text-2xl text-black font-medium">User Profile</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="w-full bg-transparent outline-none placeholder-black"
              value={userInfo.fullName || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full bg-transparent outline-none placeholder-black"
              value={userInfo.email || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
            <input
              type="date"
              name="dateOfBirth"
              className="w-full bg-transparent outline-none placeholder-black"
              value={userInfo.dateOfBirth || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              className="w-full bg-transparent outline-none placeholder-black"
              value={userInfo.phoneNumber || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="w-full bg-transparent outline-none placeholder-black"
              value={userInfo.address || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
            <input
              type="text"
              name="city"
              placeholder="City"
              className="w-full bg-transparent outline-none placeholder-black"
              value={userInfo.city || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
            <input
              type="text"
              name="state"
              placeholder="State"
              className="w-full bg-transparent outline-none placeholder-black"
              value={userInfo.state || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex border-b-black border-b-2 mx-5 my-7 py-1">
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              className="w-full bg-transparent outline-none placeholder-black"
              value={userInfo.pincode || ""}
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

export default UserProfile;
