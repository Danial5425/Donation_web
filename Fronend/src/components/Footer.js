import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


const Footer = () => {
  return (
    <footer className="bg-neutral-200 text-gray-800 py-6">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-lg font-light">Together, we can make a difference.</p>
        <p className="mt-2 text-sm">© 2024 Charity Organization. All rights reserved.</p>
        
        {/* Social Media Icons */}
        <div className="mt-4 flex justify-center space-x-6">
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-800 hover:text-blue-600 transform hover:scale-125 transition-all duration-200"
          >
            <FaFacebook size={30} />
          </a>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-800 hover:text-pink-600 transform hover:scale-125 transition-all duration-200"
          >
            <FaInstagram size={30} />
          </a>
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-800 hover:text-blue-400 transform hover:scale-125 transition-all duration-200"
          >
            <FaTwitter size={30} />
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-800 hover:text-blue-700 transform hover:scale-125 transition-all duration-200"
          >
            <FaLinkedin size={30} />
          </a>
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-800 hover:text-black transform hover:scale-125 transition-all duration-200"
          >
            <FaXTwitter  size={30} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
