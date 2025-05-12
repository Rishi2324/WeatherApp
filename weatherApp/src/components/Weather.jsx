// -------------------- Imports --------------------
import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';

// Weather icons
import search_icon from '../assets/search.png';
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
const Weather = () => {
  // Input refs for city inputs
  const inputRef1 = useRef();
  const inputRef2 = useRef();

  // State to hold weather data
  const [weatherData1, setWeatherData1] = useState(null);
  const [weatherData2, setWeatherData2] = useState(null);

  // Mapping icon codes to imported icons
  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "11d": thunderstorm_icon,
    "11n": thunderstorm_icon,
    "13d": snow_icon,
    "13n": snow_icon,
    "50d": mist_icon,
    "50n": mist_icon,
  };

  // -------------------- Fetch Weather Data --------------------
  const fetchWeather = async (city, setter) => {
    if (!city) {
      alert("Enter City Name");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        setter(null);
        return;
      }

      const icon = allIcons[data.weather[0].icon] || clear_icon;

      setter({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });

    } catch (error) {
      console.error("Error fetching data:", error);
      setter(null);
    }
  };

  // -------------------- Save to Local Storage --------------------
  const saveToLocalStorage = (data) => {
    if (!data) return;

    const saved = JSON.parse(localStorage.getItem('savedCities')) || [];
    const isDuplicate = saved.some(item => item.location === data.location);

    if (!isDuplicate) {
      saved.push(data);
      localStorage.setItem('savedCities', JSON.stringify(saved));
      alert(`${data.location} saved!`);
    } else {
      alert(`${data.location} is already saved.`);
    }
  };

  // -------------------- Initial Load --------------------
  useEffect(() => {
    fetchWeather("New York", setWeatherData1);
    fetchWeather("London", setWeatherData2);
  }, []);

  // -------------------- Render Card --------------------
  const renderCard = (data, ref, onClickSearch) => (
    <div className='container'>
      {/* Search Box */}
      <div className='box'>
        <input ref={ref} type="text" placeholder='Search' />
        <img src={search_icon} alt="search" onClick={onClickSearch} />
      </div>

      {/* Weather Info */}
      {data && (
        <>
          <img src={data.icon} alt="weather" className='weather-icon' />
          <p className='temp'>{data.temperature}°C</p>
          <p className='location'>{data.location}</p>

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

          {/* Save Button */}
          <button className="save-btn" onClick={() => saveToLocalStorage(data)}>Save</button>
        </>
      )}
    </div>
  );

  // -------------------- Return JSX --------------------
  return (
    <div className='cards'>
      {renderCard(weatherData1, inputRef1, () => fetchWeather(inputRef1.current.value, setWeatherData1))}
      {renderCard(weatherData2, inputRef2, () => fetchWeather(inputRef2.current.value, setWeatherData2))}
    </div>
  );
};

export default Weather;
