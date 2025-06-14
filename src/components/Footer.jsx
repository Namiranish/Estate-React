import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-gray-200 p-6 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-xl font-extrabold text-yellow-400">HorizonStay</h2>
          <p className="text-sm">© 2025 HorizonStay. All rights reserved.</p>
        </div>
        <div className="flex flex-wrap justify-center md:justify-end space-x-6">
          <a href="/about" className="hover:text-yellow-400 transition duration-300 cursor-pointer">About</a>
          <a href="/contact" className="hover:text-yellow-400 transition duration-300 cursor-pointer">Contact</a>
          <a href="/privacy" className="hover:text-yellow-400 transition duration-300 cursor-pointer">Privacy</a>
          <a href="/terms" className="hover:text-yellow-400 transition duration-300 cursor-pointer">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
