import React from 'react';
import './CurrentInfo.css';
import WeatherDetails from '../weather-details/WeatherDetails';
import { getFullDateFrom } from '../../utils';

export default function CurrentInfo({ current, timezone }) {
  console.log(current);
  const {
    dt: dateTime,
    temp: current_temperature,
    pressure,
    wind_speed,
    clouds,
    humidity,
  } = current;
  console.log(dateTime);
  const location = localStorage.getItem('location');

  return (
    <div className='main'>
      <h3 className='city'>{location}</h3>
      <p className='date-time'>{getFullDateFrom(dateTime, timezone)}</p>
      <section className='temperature'>
        <section className='current-temperature'>
          {current_temperature}°{`C`}
        </section>
        {/* <section className='temperature-details'>
          <div className='temperature-high'>{32}°</div>
          <hr />
          <div className='temperature-low'>{18}°</div>
        </section> */}
      </section>

      <section className='weather-details-container'>
        <WeatherDetails
          icon='fas fa-water'
          title='Atmospheric Pressure'
          value={`${pressure} hPa`}
        />
        <WeatherDetails
          icon='fas fa-wind'
          title='Wind Speed'
          value={`${wind_speed || '--'} m/s`}
        />
        <WeatherDetails
          icon='fas fa-cloud'
          title='Clouds'
          value={`${clouds || '--'} %`}
        />
        <WeatherDetails
          icon='fas fa-tint'
          title='Humidity'
          value={`${humidity || '--'}%`}
        />
      </section>
    </div>
  );
}
