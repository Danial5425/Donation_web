import React, {useEffect, useState } from "react";
import axios from "axios";
const Clothes = () => {
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
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "",
    clothingType: "",
    size: "",
    quantity: 1,
    description: "",
    address: "",
    district: "",
    state: "",
    pincode: "",
    latitude: null,
    longitude: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!latitude || !longitude) {
      alert("Location data is not available. Please enable location services.");
      return;
    }

    const updatedFormData = {
      ...formData,
      latitude: latitude,
      longitude: longitude,
    };

    try {
      const response = await axios.post(
        "http://localhost:1000/clothsdonation",
        updatedFormData
        
      ); // Use your backend URL
      if (response.data.status) {
        alert("Thank you for your food donation!");
        setFormData({
          name: "",
          phone: "",
          email: "",
          gender: "",
          clothingType: "",
          size: "",
          quantity: 1,
          description: "",
          address: "",
          district: "",
          state: "",
          pincode: "",
          latitude: null,
          longitude: null,
        });
      } else {
        alert("Error: " + response.data.message);
      }
    } catch (error) {
      console.error("There was an error submitting the form:", error);
      alert("There was an error submitting the form.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Donate Clothes
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="name"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter your full name"
          />
        </div>

        {/* Phone */}
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="phone"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter your phone number"
          />
        </div>
        {/* Email */}
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter your email address"
          />
        </div>

        {/* Gender */}
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="gender"
          >
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          >
            <option value="">Select Gender</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>

        {/* Clothing Type */}
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="clothingType"
          >
            Type of Clothes
          </label>
          <select
            id="clothingType"
            name="clothingType"
            value={formData.clothingType}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          >
            <option value="">Select Type of Clothes</option>
            <option value="Shirt">Shirt</option>
            <option value="Pants">Pants</option>
            <option value="Jacket">Jacket</option>
            <option value="Sweater">Sweater</option>
            <option value="Dress">Dress</option>
            <option value="Shorts">Shorts</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Size */}
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="size"
          >
            Size
          </label>
          <input
            type="text"
            id="size"
            name="size"
            value={formData.size}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter size (e.g., M, L, XL)"
          />
        </div>

        {/* Quantity */}
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="quantity"
          >
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            required
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter quantity"
          />
        </div>

        {/* Description */}
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="description"
          >
            Brief Description (Optional)
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Describe the clothes or their condition (Optional)"
          />
        </div>

        {/* Address */}
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="address"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter your address"
          />
        </div>

        {/* District */}
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="district"
          >
            District
          </label>
          <input
            type="text"
            id="district"
            name="district"
            value={formData.district}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter your district"
          />
        </div>

        {/* State */}
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="state"
          >
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter your state"
          />
        </div>

        {/* Pincode */}
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="pincode"
          >
            Pincode
          </label>
          <input
            type="number"
            id="pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter your pincode"
          />
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors"
          >
            Donate Clothes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Clothes;
