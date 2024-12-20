import React from 'react';
import { useNavigate } from 'react-router-dom';
import aboutImage from '../../assets/2.jpg';  // Make sure the image is in the correct path



const About = () => {
  const navigate = useNavigate();

  const handleAboutClick = () => {
    // Navigate to the donation page (replace with actual path)
    navigate("/donate");  // Change '/donate' to your actual donation page route
  };

  return (
    
    <div className="max-w-6xl mx-auto p-6">
      {/* About Us Section */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-12 flex flex-col md:flex-row">
        
        {/* Image on Left */}
        <div className="w-full md:w-3/10 mb-3 md:mb-0">
          <img 
            src={aboutImage} 
            alt="About Us" 
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Text on Right */}
        <div className="w-full md:w-7/12 md:pl-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">About Us</h2>
          <p className="text-lg text-gray-700 mb-6">
            We are a non-profit organization committed to transforming lives and making a lasting difference in the community.
            With your generous support, we strive to create sustainable change through various programs aimed at uplifting those in need.
          </p>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Mission</h3>
            <p className="text-gray-700 mb-4">
            Our mission is to provide immediate relief, restore hope, and rebuild lives in communities affected by crisis. Through your generous support, we are able to respond swiftly to emergencies and provide critical resources in times of need, including:
            </p>
            <ul className="list-disc pl-5 text-gray-700 mb-4">
              <li>Establishing education centers and safe spaces for children in need.</li>
              <li>Providing ongoing relief with food, clean water, medical supplies, and distributing leftover food to vulnerable communities. </li>
              <li>Donating clothes and supporting women and youth through empowerment programs for everyday life and crisis situations.
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">How Our Donations Help</h3>
            <p className="text-gray-700 mb-4">
              Donations play a crucial role in helping us expand our reach and impact. 
              With your support, we can continue to:
            </p>
            <ul className="list-disc pl-5 text-gray-700 mb-4">
              <li>Provide food, clean water, and essential supplies to communities affected by natural disasters and emergencies.</li>
              <li>Distribute clothing and shelter to crisis victims. </li>
              <li>Deliver medical supplies and healthcare to those in urgent need.
              </li>
            </ul>
            <p className="text-lg text-gray-600 font-semibold ">
              Every contribution, no matter how big or small, directly supports our efforts in making the world a better place.
            </p>
          </div>
        </div>
      </div>

      {/* Donate Now Button */}
      <div className="my-7 py-2 px-5 flex justify-center">
        <button
          onClick={handleAboutClick}
          className="w-10/12 h-[35px] bg-black text-white py-2 rounded transition duration-200 ease-in-out hover:bg-green-800"
        >
          Donate Now
        </button>
      </div>
      
    </div>
    
  );
};

export default About;
