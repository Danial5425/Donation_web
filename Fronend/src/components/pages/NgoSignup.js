import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

const NgoSignup = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.error("Error retrieving location:", error);
        alert("Please enable location services to proceed.");
      }
    );
  }, []);
  const [username, setUsername] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input fields
    if (
      !username ||
      !organizationName ||
      !email ||
      !password ||
      !phoneno ||
      !address ||
      !district ||
      !state ||
      !pincode ||
      !latitude ||
      !longitude
    ) {
      alert("All fields are required.");
      return;
    }

    Axios.post("http://localhost:1000/ngosuser", {
      username,
      organizationName,
      email,
      password,
      phoneno,
      address,
      district,
      state,
      pincode,
      latitude,
      longitude,
    })
      .then((res) => {
        if (res.data.status) {
          alert("Registration successful!"); // Alert on successful registration
          navigate("/ngologin");
        } else {
          alert(res.data.message); // Alert the user if there was an issue
        }
      })
      .catch((err) => {
        console.error("Error during signup:", err);
        alert("An error occurred. Please try again."); // Alert on error
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6 sm:p-8 md:p-10">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          NGO Registration
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="flex items-center border-b-2 border-gray-300 py-2 mb-4">
            <input
              type="text"
              placeholder="Enter Your Name"
              className="w-full bg-transparent outline-none placeholder-gray-500"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Organization Name Input */}
          <div className="flex items-center border-b-2 border-gray-300 py-2 mb-4">
            <input
              type="text"
              placeholder="Enter your Organization Name"
              className="w-full bg-transparent outline-none placeholder-gray-500"
              onChange={(e) => setOrganizationName(e.target.value)}
            />
          </div>

          {/* Email Input */}
          <div className="flex items-center border-b-2 border-gray-300 py-2 mb-4">
            <input
              type="email"
              placeholder="Enter Your Email Address"
              className="w-full bg-transparent outline-none placeholder-gray-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="flex items-center border-b-2 border-gray-300 py-2 mb-4">
            <input
              type="password"
              placeholder="Create a Strong Password"
              className="w-full bg-transparent outline-none placeholder-gray-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Other Fields */}
          {["phoneno", "address", "district", "state", "pincode"].map(
            (field, index) => (
              <div
                key={index}
                className="flex items-center border-b-2 border-gray-300 py-2 mb-4"
              >
                <input
                  type={
                    field === "phoneno" || field === "pincode"
                      ? "number"
                      : "text"
                  }
                  placeholder={`Enter ${
                    field.charAt(0).toUpperCase() + field.slice(1)
                  }`}
                  className="w-full bg-transparent outline-none placeholder-gray-500"
                  onChange={(e) => {
                    const setters = {
                      phoneno: setPhoneno,
                      address: setAddress,
                      district: setDistrict,
                      state: setState,
                      pincode: setPincode,
                    };
                    setters[field](e.target.value);
                  }}
                />
              </div>
            )
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-10 bg-blue-600 text-white rounded-md mt-4 hover:bg-blue-700"
          >
            Register
          </button>

          {/* Link to Login */}
          <Link
            to="/ngologin"
            className="block text-center text-sm text-blue-500 mt-4 hover:underline"
          >
            Already have an account? Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default NgoSignup;
