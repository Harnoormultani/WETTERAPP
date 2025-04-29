import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import SearchBar from './components/SearchBar';

const API_KEY = '997f2736764c5cddafe562730137f0f2'; 

function App() {
  const [search, setSearch] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = () => {
    if (!search) return;
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric&lang=de`)
      .then((res) => {
        setWeatherData(res.data);
        setError(null);
      })
      .catch((err) => {
        setWeatherData(null);
        setError('Stadt nicht gefunden 😕');
      });
  };

  return (
    <div className="app-container">
      <a href="/" className="app-title">
        🌤️ Weather App
      </a>
      <SearchBar search={search} setSearch={setSearch} fetchWeather={fetchWeather} />

      {error && <p className="error-message">{error}</p>}

      {weatherData && (
        <div className="weather-container">
          <h2 className="weather-title">
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt="Wetter Icon"
            className="weather-icon"
          />
          <ul className="weather-details">
            <li className="weather-item">
              🌡️ Temperatur: {weatherData.main.temp}°C
            </li>
            <li className="weather-item">
              🌥️ Beschreibung: {weatherData.weather[0].description}
            </li>
            <li className="weather-item">
              💧 Luftfeuchtigkeit: {weatherData.main.humidity}%
            </li>
            <li className="weather-item">
              💨 Windgeschwindigkeit: {weatherData.wind.speed} m/s
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
