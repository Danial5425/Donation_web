import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userType, setUserType] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    // Get the user type from localStorage or cookies
    const user = JSON.parse(localStorage.getItem("user")); // Assuming you store user data in localStorage
    if (user) {
      setUserType(user.role); // Set userType to 'donor' or 'ngo'
    }
  }, [userType]); // Use userType as dependency for logging

  useEffect(() => {
    // Get the user type from localStorage or cookies
    const user = JSON.parse(localStorage.getItem("user")); // Assuming you store user data in localStorage
    if (user) {
      setUserType(user.role); // Assuming 'role' is the field that stores the user type (e.g., "donor" or "ngo")
    }
  }, []);

  return (
    <div className="relative inline-block text-left">
      {/* User Icon */}
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 text-gray-700 hover:text-blue-500"
      >
        <FaUserCircle size={28} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
          onMouseLeave={() => setIsOpen(false)}
        >
          <ul className="py-1">
            {userType === "donor" ? (
              <>
                <li>
                  <Link
                    to="/userprofile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/account"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Account
                  </Link>
                </li>
              </>
            ) : userType === "ngo" ? (
              <>
              <li>
              <Link to="/ngoprofile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              NgoProfile
              </Link>
            </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    NgoDashboard
                  </Link>
                </li>
              </>
            ) : userType === "Adminuser" ? (
              <>
              
                <li>
                  <Link
                    to="/admindashboard"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    AdminDashboard
                  </Link>
                </li>
              </>
            ) : null}

          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
