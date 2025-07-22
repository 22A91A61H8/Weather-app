import React, { useState } from "react";
import './App.css';
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";
import WeatherDisplay from "./components/WeatherDisplay";

function App() {
  const API_KEY = "82a7570434ea65c4a36d563f3e36b218";
  const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const checkWeather = async (city) => {
    const trimmedCity = city.trim();
    if (!trimmedCity) {
      setError("Please enter a city name.");
      setWeatherData(null);
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}${trimmedCity}&appid=${API_KEY}`);

      if (!response.ok) {
        if (response.status === 404) {
          setError('City not found. Please Try Again');
        } else {
          setError('Something went wrong. Please try again later.');
        }
        setWeatherData(null);
        setLoading(false);
        return;
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      console.error("Fetch error", err);
      setError('Failed to fetch weather data. Check your internet connection! Try again later');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="box">
      <Header />
      <SearchBar onSearch={checkWeather} />
      {error && <p className="error-message">{error}</p>}
      {loading && <p>Loading weather data...</p>}
      {weatherData && <WeatherDisplay weather={weatherData} />}
    </div>
  );
}

export default App;
