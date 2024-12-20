import { useState, useEffect } from "react";
import NgoProfile from "./NgoProfile";
import ClothesDonation from "../../components/ClothesDonation";
import FoodsDonation from "../../components/FoodDonation";
import MoneyDonation from "../../components/MoneyDantion";

import Donationinfo from "./Donationinfo";

const NgoDashboard = () => {
  // State to track the selected section
  const [activeSection, setActiveSection] = useState("profile");
  const [donationType, setDonationType] = useState("food"); // Default to 'food'

  // Optionally, useEffect can be used to set the default donation type on component mount
  useEffect(() => {
    setDonationType("food"); // Ensure that food donation is shown initially
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-full lg:w-1/5 p-4">
        <div className="space-y-4">
          <button
            onClick={() => setActiveSection("profile")}
            className="w-full text-left bg-gray-600 p-2 rounded-lg hover:bg-gray-500"
          >
            Profile
          </button>
          <button
            onClick={() => setActiveSection("donationDetails")}
            className="w-full text-left bg-gray-600 p-2 rounded-lg hover:bg-gray-500"
          >
            Donation Details
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-4/5 p-6">
        {activeSection === "profile" ? (
          <NgoProfile />
        ) : (
          <div>
            {/* Donation Type Selection */}
            <h1 className="text-2xl font-semibold mb-4">Donation Details</h1>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setDonationType("food")}
                className={`w-32 py-3 rounded-lg text-white ${donationType === "food" ? "bg-blue-600" : "bg-gray-600"} hover:bg-gray-500`}
              >
                Food
              </button>
              <button
                onClick={() => setDonationType("clothes")}
                className={`w-32 py-3 rounded-lg text-white ${donationType === "clothes" ? "bg-blue-600" : "bg-gray-600"} hover:bg-gray-500`}
              >
                Clothes
              </button>
              <button
                onClick={() => setDonationType("money")}
                className={`w-32 py-3 rounded-lg text-white ${donationType === "money" ? "bg-blue-600" : "bg-gray-600"} hover:bg-gray-500`}
              >
                Money
              </button>
              <button
                onClick={() => setDonationType("others")}
                className={`w-32 py-3 rounded-lg text-white ${donationType === "others" ? "bg-blue-600" : "bg-gray-600"} hover:bg-gray-500`}
              >
                Others
              </button>
            </div>
            {/* Render the appropriate donation form */}
            {donationType === "food" && <FoodsDonation />}
            {donationType === "clothes" && <ClothesDonation />}
            {donationType === "money" && <MoneyDonation />}
            {donationType === "others" && <Donationinfo />}
          </div>
        )}
      </div>
    </div>
  );
};

export default NgoDashboard;
