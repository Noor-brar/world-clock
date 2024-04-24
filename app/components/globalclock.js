import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import zonesData from '../zones.json';

const GlobalTime = () => {
  // State for selected timezone, time details, and loading status
  const [currentZone, setCurrentZone] = useState(null);
  const [timeDetails, setTimeDetails] = useState({});
  const [isFetching, setIsFetching] = useState(false);

  // Get the user's local timezone
  const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Setup the timer to update local time every second after component mounts
  useEffect(() => {
    setTimeDetails({
      datetime: new Date().toISOString(),
      timezone: localTimeZone
    });

    const timer = setInterval(() => {
      setTimeDetails(prevDetails => ({
        ...prevDetails,
        datetime: new Date().toISOString() // Update the time continuously
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Options for the timezone dropdown
  const zoneOptions = zonesData.map(z => ({
    value: z.utc[0], 
    label: z.text 
  }));

  // Fetches time for a specific timezone from an API
  const retrieveTime = async () => {
    if (!currentZone) {
      return; // Exit if no timezone is selected
    }
    setIsFetching(true);
    try {
      const response = await fetch(`https://worldtimeapi.org/api/timezone/${currentZone.value}`);
      if (!response.ok) {
        throw new Error('Failed to fetch the time');
      }
      const data = await response.json();
      setTimeDetails({
        datetime: data.datetime,
        timezone: data.timezone 
      });
    } catch (err) {
      console.error(`Error: ${err.message}`);
    } finally {
      setIsFetching(false);
    }
  };

  // Formats the datetime string into a readable time format
  const displayTime = timeDetails.datetime
    ? new Date(timeDetails.datetime).toLocaleTimeString('en-US', { timeZone: timeDetails.timezone })
    : '';

  // Component layout
  return (
    <div className="flex flex-col justify-center p-4 w-full h-screen">
      <div className="absolute top-0 left-0 right-0 flex items-center px-4">
        <Select
          options={zoneOptions}
          onChange={setCurrentZone}
          value={currentZone}
          className="flex-grow w-1/2 m-4 font-bold text-black custom-select"
          placeholder={currentZone ? "Choose a timezone" : "Your local time is currently being displayed"}
          noOptionsMessage={() => "Timezones unavailable"}
          isSearchable
        />
        <button
          onClick={retrieveTime}
          disabled={isFetching}
          className="ml-4 px-4 py-2 bg-sky-600 text-white font-semibold rounded hover:bg-sky-900"
        >
          {isFetching ? 'Fetching...' : 'Get Time'}
        </button>
      </div>
      {displayTime && (
        <div className="flex-grow flex items-center justify-center">
          <p className="text-9xl tabular-nums font-bold custom-time-display">{displayTime}</p>
        </div>
      )}
    </div>
  );
};

export default GlobalTime;
