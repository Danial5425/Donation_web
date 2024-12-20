import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NgoDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

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
            <li>
            <Link to="/ngoprofile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Profile
              </Link>
              
            </li>
            <li>
              <a
                href="/notifications"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Notifications
              </a>
            </li>
            <li>
             
              <Link to="/donationhistory" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Donation Details
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NgoDropdown;
