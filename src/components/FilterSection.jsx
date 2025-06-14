import React, { useState } from "react";
import PropertyCard from "./PropertyCard";
import { properties } from "../data/properties";

const Filters = () => {
  const [filters, setFilters] = useState({
    location: "",
    moveInDate: "",
    priceRange: "",
    propertyType: "",
  });

  const [likedProperties, setLikedProperties] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const toggleFavorite = (property) => {
    setLikedProperties((prevLiked) =>
      prevLiked.some((item) => item.id === property.id)
        ? prevLiked.filter((item) => item.id !== property.id)
        : [...prevLiked, property]
    );
  };

  const uniqueLocations = ["", ...new Set(properties.map((p) => p.location.split(",")[1].trim()))];
  const uniquePropertyTypes = ["", ...new Set(properties.map((p) => p.type))];

  // Filter Logic for Prices in Lakhs (₹)
  const filteredProperties = properties.filter((property) => {
    const locationMatch =
      !filters.location || property.location.toLowerCase().includes(filters.location.toLowerCase());

    let priceMatch = true;
    if (filters.priceRange) {
      const [minStr, maxStr] = filters.priceRange.split("-");
      const min = Number(minStr) * 100000;
      const max = maxStr ? Number(maxStr) * 100000 : Infinity;
      priceMatch = property.price >= min && property.price <= max;
    }

    const typeMatch = !filters.propertyType || property.type === filters.propertyType;

    const dateMatch =
      !filters.moveInDate || new Date(property.availableDate) >= new Date(filters.moveInDate);

    return locationMatch && priceMatch && typeMatch && dateMatch;
  });

  const displayedProperties = showFavorites ? likedProperties : filteredProperties;

  return (
    <section className="text-white p-6 rounded-lg mb-6">
      <div className="flex flex-col md:flex-row items-center justify-center md:space-x-4 space-y-4 md:space-y-0">
        <select
          name="location"
          value={filters.location}
          onChange={handleChange}
          className="bg-white text-gray-800 border-none p-3 rounded-md w-full md:w-auto cursor-pointer"
        >
          <option value="">All Locations</option>
          {uniqueLocations.filter(Boolean).map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="moveInDate"
          value={filters.moveInDate}
          onChange={handleChange}
          className="bg-white text-gray-800 border-none p-3 rounded-md w-full md:w-auto cursor-pointer"
        />

        <select
          name="priceRange"
          value={filters.priceRange}
          onChange={handleChange}
          className="bg-white text-gray-800 border-none p-3 rounded-md w-full md:w-auto cursor-pointer"
        >
          <option value="">All Prices</option>
          <option value="5-7.5">₹5L - ₹7.5L</option>
          <option value="7.5-9.5">₹7.5L - ₹9.5L</option>
          <option value="9.5-10">₹9.5L - ₹10L</option>
        </select>

        <select
          name="propertyType"
          value={filters.propertyType}
          onChange={handleChange}
          className="bg-white text-gray-800 border-none p-3 rounded-md w-full md:w-auto cursor-pointer"
        >
          <option value="">All Types</option>
          {uniquePropertyTypes.filter(Boolean).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <button className="bg-yellow-400 text-black px-5 py-3 rounded-md w-full md:w-auto font-semibold hover:bg-yellow-500 cursor-pointer">
          Search
        </button>

        <button
          className="bg-green-400 text-black px-5 py-3 rounded-md w-full md:w-auto font-semibold hover:bg-green-500 cursor-pointer mt-4 md:mt-0"
          onClick={() => setShowFavorites(!showFavorites)}
        >
          {showFavorites
            ? "View All Properties"
            : `View Favorites (${likedProperties.length})`}
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {displayedProperties.length > 0 ? (
          displayedProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              toggleFavorite={toggleFavorite}
              isFavorited={likedProperties.some((item) => item.id === property.id)}
            />
          ))
        ) : (
          <p className="text-center text-lg text-gray-400">No properties available</p>
        )}
      </div>
    </section>
  );
};

export default Filters;
