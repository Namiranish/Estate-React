import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import FilterSection from "./FilterSection"; // Updated import

const rotatingWords = ["Apartment", "House", "Villa"];

const Hero = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = rotatingWords[currentWordIndex];
    const typingSpeed = isDeleting ? 80 : 120;

    const timeout = setTimeout(() => {
      setDisplayText((prev) =>
        isDeleting ? fullText.substring(0, prev.length - 1) : fullText.substring(0, prev.length + 1)
      );

      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentWordIndex]);

  return (
    <section className="relative w-full overflow-hidden pb-10">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 h-screen"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80')",
        }}
      ></div>

      {/* Black transparent overlay */}
      <div className="absolute inset-0 bg-black opacity-30 z-10 h-screen"></div>

      {/* Hero Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-screen text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold">
          Find Your Dream <span className="text-yellow-400">{displayText}|</span>
        </h1>
      </div>

      {/* Floating Social Icons - Center Right */}
      <div className="absolute top-90 right-4 transform -translate-y-1/2 space-y-4 z-30">
        <a
          href="https://www.linkedin.com/in/namira-anis/"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-md hover:bg-blue-700 transition"
        >
          <FaLinkedinIn />
        </a>
        <a
          href="https://github.com/Namiranish"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white shadow-md hover:bg-gray-900 transition"
        >
          <FaGithub />
        </a>
      </div>

      {/* Filters Section */}
      <div className="relative z-20 mt-8 px-4 max-w-7xl mx-auto">
        <FilterSection />
      </div>
    </section>
  );
};

export default Hero;