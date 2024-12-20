import { useState } from "react";
import UserProfile from "./UserProfile";
import UserDonationinfo from "./UserDonationinfo";


const Account = () => {
  // State to track the selected section
  const [activeSection, setActiveSection] = useState("profile");

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
          <h1 className=""><UserProfile/></h1>
        ) : (
          <h1 className=""><UserDonationinfo/></h1>
        )}
      </div>
    </div>
  );
};

export default Account;
