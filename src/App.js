import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';

const API_KEY = "569e6a94f6f58d81d4633f8491dfe579"; // ✅ Use your confirmed OpenWeatherMap API key

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const getWeather = async () => {
    const trimmedCity = city.trim();
    if (!trimmedCity) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${trimmedCity}&appid=${API_KEY}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      console.log("API Response:", data); // Debug output

      if (data.cod === 200) {
        setWeather(data);
        setError('');
      } else {
        setWeather(null);
        setError(`City "${trimmedCity}" not found. Try adding country code like "yanam,in".`);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Something went wrong while fetching weather data.");
    }
  };

  return (
    <div className="App">
      <Header />

      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Get Weather</button>

      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <div className="weather-details">
            <p>🌡 Temperature: {weather.main.temp} °C</p>
            <p>💧 Humidity: {weather.main.humidity} %</p>
            <p>💨 Wind Speed: {weather.wind.speed} m/s</p>
            <p>📍 Latitude: {weather.coord.lat}</p>
            <p>📍 Longitude: {weather.coord.lon}</p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default App;
