import React, { useState, useEffect } from "react";
import image1 from "../../assets/image one.jpg";
import image2 from "../../assets/image2.jpg";
import image3 from "../../assets/image3.jpg";
import image4 from "../../assets/image4.jpg";
import image5 from "../../assets/11.jpg";
import card1 from "../../assets/card1.jpeg";
import card3 from "../../assets/card3.jpg";
import card4 from "../../assets/card4.jpg";


import { Link } from "react-router-dom";

const Home = () => {
  const slides = [
    {
      url: image1,
      alt: "image1",
    },
    {
      url: image2,
      alt: "image2",
    },
    {
      url: image3,
      alt: "image3",
    },
    {
      url: image4,
      alt: "image4",
    },
    {
      url: image5,
      alt: "image5",
    },
  ];

  const autoSlideInterval = 3000;

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
  };

  const nextSlide = () => {
    setCurrentIndex(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
  };
  const goToSlide = (slideIndex) => setCurrentIndex(slideIndex);

  const DotIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      className="w-4 h-4"
    >
      <circle cx="12" cy="12" r="6" />
    </svg>
  );
  useEffect(() => {
    const interval = setInterval(nextSlide, autoSlideInterval);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [nextSlide, autoSlideInterval]); // Include nextSlide here

  return (
    <>
      <div className="max-w-[90%] h-[700px] w-full m-auto py-10 px-4 relative group">
        <div
          style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
          className="w-full h-full rounded-2xl bg-center bg-cover transition-transform ease-in-out  duration-[500ms]  "
        ></div>

        {/* Left Arrow */}
        <div
          className="hidden group-hover:block absolute top-[50%]   left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
          onClick={prevSlide}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </div>

        {/* Right Arrow */}
        <div
          className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
          onClick={nextSlide}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>

        {/* Slide Indicators */}
        <div className="absolute left-[50%] right-[50%]  ">
          <div className="absolute bottom-4 left-0 right-0 flex  justify-center py-2 ">
            {slides.map((slide, slideIndex) => (
              <div
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className={`cursor-pointer ${
                  currentIndex === slideIndex ? "text-white" : "text-gray-400"
                }`}
              >
                <DotIcon />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex min-h-screen items-center justify-center ">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
            <div className="h-96 w-72">
              <img
                className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
                src={card1}
                alt=""
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
            <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
              <h1 className="font-dmserif text-3xl font-bold text-white">
                Feed the Hunger
              </h1>
              <p className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                "Feeding one person may seem like a small effort, but it can
                change their world."
              </p>
              <Link to={"/foods"}>
              <button className="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60">
                Donate
              </button>
              </Link>
            </div>
          </div>

          <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
            <div className="h-96 w-72">
              <img
                className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
                src={card3}
                alt=""
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
            <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
              <h1 className="font-dmserif text-3xl font-bold text-white">
                Clothes Donation
              </h1>
              <p className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                "The greatest gift you can give is your time and compassion.
                Donate clothes and share the warmth.".
              </p>
              <Link to={"/clothes"}>
              <button className="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60">
                Donate
              </button>
              </Link>
            </div>
          </div>
          <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
            <div className="h-96 w-72">
              <img
                className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
                src={card4}
                alt=""
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
            <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
              <h1 className="font-dmserif text-3xl font-bold text-white">
                Save the Poverty
              </h1>
              <p className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Give clothes a new look
              </p>
              <Link to={"/money"}>
              <button className="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60">
                Donate
                
              </button>
              </Link>
              
            
            </div>
          </div>
        </div>
      </div>
     
      
    </>
  );
};

export default Home;
