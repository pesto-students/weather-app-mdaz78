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
  const [response, setResponse] = useState(null);
  const [temperatureUnit, setTemperatureUnit] = useState('metric');

  const APP_ID = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const apiResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={minutely}&units=${temperatureUnit}&appid=${APP_ID}`,
        );

        setResponse(apiResponse.data);
        setLoading(false);
      },
      () => {
        setGeoLocationError(true);
        setLoading(false);
      },
    );
  }, []);

  let componentsToRender;

  if (!loading) {
    console.log(response);
    componentsToRender = (
      <>
        <main className='main-area'>
          <CurrentInfo current={response.current} />
          <FutureForecasts
            dailyState={response.daily}
            hourlyStats={response.hourly}
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
