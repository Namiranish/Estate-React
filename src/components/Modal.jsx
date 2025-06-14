import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Modal = ({ images, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Light grey semi-transparent background */}
      <div
        className="absolute inset-0  backdrop-blur-sm"
onClick={onClose}

      ></div>

      <div className="relative z-10 bg-white rounded-lg p-4 max-w-xl w-full shadow-xl overflow-hidden">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 z-20 text-gray-700 hover:text-gray-900 bg-white rounded-full p-1 shadow"
          onClick={onClose}
        >
          <IoMdClose size={20} />
        </button>

        <div className="relative">
          <img
            src={images[currentIndex]}
            alt={`Property ${currentIndex + 1}`}
            className="w-full h-96 object-cover rounded-md"
            onError={(e) => {
              e.target.src =
                'https://via.placeholder.com/600x400?text=Image+Not+Found';
            }}
          />

          {/* Left Arrow */}
          {images.length > 1 && (
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-gray-200 text-black rounded-full p-2 shadow hover:bg-gray-300 z-10"
            >
              <FaChevronLeft />
            </button>
          )}

          {/* Right Arrow */}
          {images.length > 1 && (
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-200 text-black rounded-full p-2 shadow hover:bg-gray-300 z-10"
            >
              <FaChevronRight />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
