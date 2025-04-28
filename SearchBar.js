import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const API_KEY = '997f2736764c5cddafe562730137f0f2';

function SearchBar() {
  const [search, setSearch] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = () => {
    console.log('Search value:', search); // Debugging the `search` state
    if (!search) {
      console.log('Search input is empty');
      return;
    }
    console.log(`Fetching weather for: ${search}`);
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric&lang=de`)
      .then((res) => {
        console.log('Weather data:', res.data);
        setWeatherData(res.data);
        setError(null);
      })
      .catch((err) => {
        console.error('Error fetching weather:', err);
        setWeatherData(null);
        setError('Stadt nicht gefunden');
      });
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={search}
        placeholder="Stadt eingeben..."
        onChange={(e) => setSearch(e.target.value)} // Updates the `search` state
        onKeyDown={(e) => e.key === 'Enter' && fetchWeather()} // Triggers `fetchWeather` on Enter
        className="search-input"
      />
      <button onClick={fetchWeather} className="search-button">
        Suchen
      </button>
      {error && <p className="error-message">{error}</p>}
      {weatherData && (
        <div className="weather-card">
          <h2 className="weather-city">
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          <div className="weather-details">
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt="Weather Icon"
              className="weather-icon"
            />
            <div className="weather-info">
              <p className="weather-temp">🌡️ {weatherData.main.temp}°C</p>
              <p className="weather-description">{weatherData.weather[0].description}</p>
              <p className="weather-humidity">💧 Luftfeuchtigkeit: {weatherData.main.humidity}%</p>
              <p className="weather-wind">💨 Wind: {weatherData.wind.speed} m/s</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;