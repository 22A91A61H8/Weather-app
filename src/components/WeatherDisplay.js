import React from "react";

function WeatherDisplay({ weather }) {
  let weatherIconSrc = '';
  const weatherCondition = weather.weather[0].main.toLowerCase();

  if (weatherCondition.includes('clouds')) {
    weatherIconSrc = '/images/clouds.png';
  } else if (weatherCondition.includes('clear')) {
    weatherIconSrc = '/images/clear.png';
  } else if (weatherCondition.includes('rain')) {
    weatherIconSrc = '/images/rain.png';
  } else if (weatherCondition.includes('mist')) {
    weatherIconSrc = '/images/mist.png';
  } else if (weatherCondition.includes('snow')) {
    weatherIconSrc = '/images/snow.png';
  } else if (weatherCondition.includes('drizzle')) {
    weatherIconSrc = '/images/drizzle.png';
  } else {
    weatherIconSrc = '/images/default.png';
  }

  return (
    <div className="weather">
      <img src={weatherIconSrc} className="weather-icon" alt={weather.weather[0].description} />
      <h1 className="temp">{Math.round(weather.main.temp)}°C</h1>
      <h2 className="city">{weather.name}</h2>

      {/* ✅ Now displaying full weather info as required */}
      <div className="details">
        <p>Humidity: {weather.main.humidity}%</p>
        <p>Wind Speed: {weather.wind.speed} m/s</p>
        <p>Latitude: {weather.coord.lat}</p>
        <p>Longitude: {weather.coord.lon}</p>
      </div>
    </div>
  );
}

export default WeatherDisplay;
