import React, { useEffect,useState } from 'react';
import axios from "axios";

const MoneyDonation = () => {
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
    email: "",
    phone: "",
    amount: "",
    paymentMethod: "",
    message: "",
    address: "",
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
      const response = await axios.post("http://localhost:1000/moneydonation", updatedFormData); // Use your backend URL
      if (response.data.status) {
        alert("Thank you for your money donation!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          amount: "",
          paymentMethod: "",
          message: "",
          address: "",
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
        Donate Money
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
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

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
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

        {/* Phone */}
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter your phone number (Optional)"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="amount">
            Donation Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter amount to donate"
            min="1"
          />
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="paymentMethod">
            Payment Method
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          >
            <option value="">Select Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="PayPal">PayPal</option>
            <option value="Cheque">Cheque</option>
          </select>
        </div>

        {/* Message (Optional) */}
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
            Message or Notes (Optional)
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Any specific notes or message for the donation?"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="address">
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
            placeholder="Enter your address (for tax receipt)"
          />
        </div>

        {/* Pincode */}
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="pincode">
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
            Donate Money
          </button>
        </div>
      </form>
    </div>
  );
};

export default MoneyDonation;
