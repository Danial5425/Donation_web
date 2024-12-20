import React from "react";
import card1 from "../../assets/card1.jpeg";
import card3 from "../../assets/clo.jpg"; // Clothes donation image
import card4 from "../../assets/card4.jpg";
import { Link } from "react-router-dom";

const Donate = () => {
  return (
    <>
      <div className="bg-gray-100 min-h-screen flex flex-col">
        {/* Header Section */}
        <header className="bg-blue-500 text-gray-800 py-8 text-center">
          <h1 className="text-4xl font-semibold">Make a Difference Today</h1>
          <p className="mt-2 text-lg font-light">
            Your generosity can help feed the hungry, provide clothes, and
            reduce poverty.
          </p>
        </header>

        {/* Main Content Section */}
        <main className="flex-grow p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feed the Hunger Section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 hover:shadow-xl transition-all duration-300">
              <div className="w-full h-64">
                <img
                  className="w-full h-full object-cover"
                  src={card1}
                  alt="Feed the Hunger"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Feed the Hunger
                </h2>
                <p className="mt-2 text-gray-600">
                  "Feeding one person may seem like a small effort, but it can
                  change their world."
                </p>

                <Link to={"/foods"}>
                  <button className="mt-4 w-full bg-indigo-300 text-white py-2 rounded-lg hover:bg-blue-500 transition-colors">
                    Donate Foods
                  </button>
                </Link>
              </div>
            </div>

            {/* Clothes Donation Section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 hover:shadow-xl transition-all duration-300">
              <div className="w-full h-64">
                <img
                  className="w-full h-full object-cover"
                  src={card3}
                  alt="Clothes Donation"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Clothes Donation
                </h2>
                <p className="mt-2 text-gray-600">
                  "The greatest gift you can give is your time and compassion.
                  Donate clothes and share the warmth."
                </p>
                <Link to={"/clothes"}>
                  <button className="mt-4 w-full bg-indigo-300 text-white py-2 rounded-lg hover:bg-blue-500 transition-colors">
                    Donate Clothes
                  </button>
                </Link>
              </div>
            </div>

            {/* No Poverty Section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 hover:shadow-xl transition-all duration-300">
              <div className="w-full h-64">
                <img
                  className="w-full h-full object-cover"
                  src={card4}
                  alt="No Poverty"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800">No Poverty</h2>
                <p className="mt-2 text-gray-600">
                  "Your generosity can create opportunities and lift lives. Help
                  reduce poverty with your donation today."
                </p>
                <Link to={"/money"}>
                  <button className="mt-4 w-full bg-indigo-300 text-white py-2 rounded-lg hover:bg-blue-500 transition-colors">
                    Donate Money
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Donate;
