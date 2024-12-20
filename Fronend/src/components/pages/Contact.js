import React from 'react';

const ContactUs = () => {
  const handleContactClick = () => {
    // This will open the default email client when clicked
    window.location.href = "mailto:danikami4525@gmail.com?subject=Contact Us";
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Contact Us Section */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
        <p className="text-gray-700 mb-4">
          We would love to hear from you! Whether you have questions, suggestions, or want to get involved, feel free to reach out.
        </p>

        <div className="space-y-4">
          <div className="flex items-center">
            <span className="font-medium text-gray-700 w-32">Email:</span>
            <a href="mailto:danikami4525@gmail.com" className="text-blue-500 hover:underline">danikami4525@gmail.com</a>
          </div>
          <div className="flex items-center">
            <span className="font-medium text-gray-700 w-32">Phone:</span>
            <span className="text-gray-700">+91 6909760772</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium text-gray-700 w-32">Address:</span>
            <span className="text-gray-700">Hope in Crisis Foundation, Assam</span>
          </div>
        </div>
      </div>

      {/* Google Map Embed */}
      <div className="mb-12">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14328.266618887203!2d91.6204597!3d26.1293696!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a43f3fffffff9%3A0x122d2ba3a82829ab!2sAssam%20Don%20Bosco%20University%2C%20Azara%20Guwahati!5e0!3m2!1sen!2sin!4v1731123197773!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}a
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Contact Button - Styled like the Signup Button */}
      <div className="my-7 py-2 px-5 flex justify-center">
        <button
          onClick={handleContactClick}
          className="w-10/12 h-[35px] bg-black text-white py-2 rounded transition duration-200 ease-in-out hover:bg-green-800"
        >
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default ContactUs;
