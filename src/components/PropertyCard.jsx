import React, { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import Modal from './Modal'; // Make sure this path is correct

const PropertyCard = ({ property, toggleFavorite, isFavorited }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    if (property.images && property.images.length > 0) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div className="bg-blue-50 p-5 rounded-xl shadow-lg transition-transform transform hover:scale-105">
        <img
          src={property.images[0]}
          alt={property.name}
          loading="lazy"
          className="w-full h-52 object-cover rounded-lg cursor-pointer"
          onClick={handleImageClick}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
          }}
        />
        <div className="mt-3 flex items-center">
          <h3 className="text-xl font-bold text-blue-800">{property.name}</h3>
          <div onClick={() => toggleFavorite(property)} className="ml-2 cursor-pointer">
            {isFavorited ? (
              <AiFillHeart className="text-red-600" />
            ) : (
              <AiOutlineHeart className="text-gray-400" />
            )}
          </div>
        </div>
        <p className="text-gray-700">{property.location}</p>
        <p className="text-blue-600 font-semibold text-lg">₹{(property.price / 100000).toFixed(2)} Lakh</p>
        <div className="flex justify-between text-gray-600 mt-2 text-sm">
          <span>{property.beds} Beds</span>
          <span>{property.bathrooms} Bathrooms</span>
          <span>{property.size}m²</span>
        </div>
        {property.popular && (
          <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-xs font-medium mt-3 inline-block">
            Popular
          </span>
        )}
      </div>

      {isModalOpen && (
        <Modal
          images={property.images}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default PropertyCard;
