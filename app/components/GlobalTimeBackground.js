import React from 'react';
import GlobalTime from './globalclock';  

// Component that provides a background with a clock image and overlays the GlobalTime component
const GlobalTimeBackground = ({ timezone }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
       {/* Background image for the clock display */}
      <img src="./clock.jpg" alt="Global Clock Background" //source: https://in.pinterest.com/pin/206039751696082965/
           className="absolute inset-0 w-full h-full object-cover z-0" style={{ opacity: 0.35 }} />

       {/* Container for the GlobalTime component, centered within the background */}
      <div className="absolute z-10 flex items-center justify-center w-full h-full">
        <GlobalTime timezone={timezone} />
      </div>
    </div>
  );
};

export default GlobalTimeBackground;
