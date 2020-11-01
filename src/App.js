import './App.css';
import React, { useState, useEffect } from 'react';
import Search from './components/search/Search.js';
import CurrentInfo from './components/current-info/CurrentInfo';
import FutureForecasts from './components/future-forecasts/FutureForecasts';
import Loader from './components/loader/Loader';
import Error from './components/error/Error';
import axios from 'axios';

function App() {
  const [loading, setLoading] = useState(true);
  const [geolocationError, setGeoLocationError] = useState(false);
  const [weatherInformation, setWeatherInformation] = useState(null);
  const [temperatureUnit, setTemperatureUnit] = useState('metric');

  const OPEN_WEATHER_APP_ID = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
  const LOCATION_IQ_KEY = process.env.REACT_APP_LOCATION_IQ_KEY;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const openWeatherResponse = axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={minutely}&units=${temperatureUnit}&appid=${OPEN_WEATHER_APP_ID}`,
        );

        const locationResponse = axios.get(
          `https://us1.locationiq.com/v1/reverse.php?key=${LOCATION_IQ_KEY}&format=json&lat=${lat}&lon=${lon}`,
        );

        const weatherInformation = await openWeatherResponse;
        const locationInformation = await locationResponse;

        const locationData = locationInformation.data.address;
        const location = `${locationData.city}, ${locationData.state}, ${locationData.country}`;

        localStorage.setItem('location', location);
        localStorage.setItem('lat', lat);
        localStorage.setItem('lon', lon);

        setWeatherInformation(weatherInformation.data);
        setLoading(false);
      },
      () => {
        setGeoLocationError(true);
        setLoading(false);
      },
    );
  }, []);

  let componentsToRender;

  if (!loading && !geolocationError) {
    componentsToRender = (
      <>
        <main className='main-area'>
          <CurrentInfo
            current={weatherInformation.current}
            timezone={weatherInformation.timezone}
          />
          <FutureForecasts
            dailyStats={weatherInformation.daily}
            hourlyStats={weatherInformation.hourly}
            timezone={weatherInformation.timezone}
          />
        </main>
      </>
    );
  } else {
    componentsToRender = <Loader />;
  }

  return (
    <>
      <h1 className='heading'>Weather</h1>
      <Search />
      {geolocationError ? (
        <Error message='Access to Location denied. Please use the search bar to look up the weather of the city you want.' />
      ) : (
        componentsToRender
      )}
    </>
  );
}

export default App;
