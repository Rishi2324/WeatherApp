// -------------------- Imports --------------------
import React, { useEffect, useState } from 'react';
import './Weather.css';

// Weather icons
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';
import thunderstorm_icon from '../assets/thunderstorm.png';
import mist_icon from '../assets/mist.png';

// -------------------- Component --------------------
const SavedCities = () => {
  // State to hold saved cities
  const [savedCities, setSavedCities] = useState([]);

  // -------------------- Load from Local Storage --------------------
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedCities')) || [];
    setSavedCities(saved);
  }, []);

  // -------------------- Delete City --------------------
  const handleDelete = (indexToDelete) => {
    const updatedCities = savedCities.filter((_, index) => index !== indexToDelete);
    setSavedCities(updatedCities);
    localStorage.setItem('savedCities', JSON.stringify(updatedCities));
  };

  // -------------------- Return JSX --------------------
  return (
    <div className='cards'>
      {savedCities.length === 0 ? (
        <p className='no'>No saved cities found.</p>
      ) : (
        savedCities.map((data, index) => (
          <div key={index} className='container'>
            {/* Weather Icon */}
            <img src={data.icon} alt="weather" className='weather-icon' />

            {/* Temperature and Location */}
            <p className='temp'>{data.temperature}°C</p>
            <p className='location'>{data.location}</p>

            {/* Weather Details */}
            <div className='weather-data'>
              <div className='col'>
                <img src={humidity_icon} alt="humidity" />
                <div className='img-blk'>
                  <p>{data.humidity} %</p>
                  <span>Humidity</span>
                </div>
              </div>

              <div className='col'>
                <img src={wind_icon} alt="wind" />
                <div className='img-blk'>
                  <p>{data.windSpeed} Km/h</p>
                  <span>Wind Speed</span>
                </div>
              </div>
            </div>

            {/* Delete Button */}
            <button onClick={() => handleDelete(index)} className="delete-btn">
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default SavedCities;
