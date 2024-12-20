import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import UserDropdown from "./UserDropdown";

import { useState } from "react";

export const Appbar = ({ isUserSignedIn, setIsUserSignedIn }) => {
  const [open, setOpen] = useState(false);

  const menuClicked = () => {
    setOpen(!open);
  };

  return (
    <nav className="mt-5 border-b-4">
      <div className="md:flex justify-between w-5/6 md:max-w-7xl mx-auto">
        <div className="flex justify-between">
          <div>
            <span className="text-black font-bold text-4xl">
              Hope in Crisis
            </span>
          </div>
          <div className="md:hidden mt-2">
            <button onClick={menuClicked}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
        <div
          className={`flex md:block justify-end ${open ? "block" : "hidden"}`}
        >
          <ul className="md:flex md:space-x-8 space-y-8 md:space-y-0">
            <li className="menu border-b-4">
              <Link className="font-display" to="/">
                Home
              </Link>
            </li>
            <li className="menu">
              <Link className="font-display" to="/donate">
                Donate
              </Link>
            </li>
            <li className="menu">
              <Link className="font-display" to="/about">
                About
              </Link>
            </li>
            <li className="menu">
              <Link className="font-display" to="/contact">
                Contact
              </Link>
            </li>
            {isUserSignedIn ? (
              <>
                <li className="">
                  <UserDropdown
                    isUserSignedIn={isUserSignedIn}
                    setIsUserSignedIn={setIsUserSignedIn}
                  />
                </li>

                <li className="menu">
                  <Logout setIsUserSignedIn={setIsUserSignedIn} />
                </li>
              </>
            ) : (
              <>
                <li className="menu">
                  <Link className="font-display" to="/mainsignup">
                    Sign up
                  </Link>
                </li>
                <li className="menu">
                  <Link className="font-display" to="/mainlogin">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Appbar;
