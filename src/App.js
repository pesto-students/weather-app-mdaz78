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
  const [coords, setCoords] = useState(null);
  const [location, setLocation] = useState('');

  const OPEN_WEATHER_APP_ID = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
  const LOCATION_IQ_KEY = process.env.REACT_APP_LOCATION_IQ_KEY;

  useEffect(() => {
    if (coords) {
      fetchDataAndLocation();
    } else {
      getCoords();
    }
  }, [coords, location, temperatureUnit, geolocationError]);

  const getCoords = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        setCoords({
          latitude: lat,
          longitude: lon,
        });
      },
      () => setGeoLocationError(true),
    );
  };

  function refresh() {
    fetchDataAndLocation();
  }

  const fetchDataAndLocation = async () => {
    setLoading(true);
    const { latitude, longitude } = coords;
    const openWeatherResponse = axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={minutely}&units=${temperatureUnit}&appid=${OPEN_WEATHER_APP_ID}`,
    );

    const locationResponse = axios.get(
      `https://us1.locationiq.com/v1/reverse.php?key=${LOCATION_IQ_KEY}&format=json&lat=${latitude}&lon=${longitude}`,
    );

    const weatherInformation = await openWeatherResponse;
    const locationInformation = await locationResponse;
    const locationData = locationInformation.data.address;
    const location = `${
      locationData.name || locationData.city || locationData.suburb
    }, ${locationData.state}, ${locationData.country}`;

    setLocation(location);
    setWeatherInformation(weatherInformation.data);
    setLoading(false);
    setGeoLocationError(false);
  };

  const updateCoords = (coords) => {
    setCoords(coords);
  };

  let componentsToRender;

  if (!loading && !geolocationError) {
    componentsToRender = (
      <>
        <main className='main-area'>
          <CurrentInfo
            current={weatherInformation.current}
            timezone={weatherInformation.timezone}
            location={location}
            refresh={refresh}
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
      <Search updateCoords={updateCoords} />
      {geolocationError ? (
        <Error message='Access to Location denied. Please use the search bar to look up the weather of the city you want.' />
      ) : (
        componentsToRender
      )}
    </>
  );
}

export default App;
