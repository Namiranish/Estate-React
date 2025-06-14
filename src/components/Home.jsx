import React, { useState } from 'react';
import Filters from '../components/FilterSection';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from './Hero';

const Home = () => {
  const [filters, setFilters] = useState({
    location: '', 
    moveInDate: '',
    priceRange: '', 
    propertyType: '' 
  });

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero/>
      
      <Footer />
    </div>
  );
};

export default Home;