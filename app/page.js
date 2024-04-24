"use client";
import React, { useState } from 'react';
import GlobalTimeBackground from './components/GlobalTimeBackground';

// Main container component for the home page
const Home = () => {
  // State to manage the current view, defaulted to 'global'
  const [view, setView] = useState('global');

  // Handler to change the current view based on user selection
  const handleSelect = (selectedView) => {
    setView(selectedView);
  };

  // Render the GlobalTimeBackground component
  return (
    <div className="relative">
        <GlobalTimeBackground />
    </div>
  );
};

export default Home;
