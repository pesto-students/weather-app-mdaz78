import React from 'react';
import './CurrentInfo.css';
import WeatherDetails from '../weather-details/WeatherDetails';

export default function CurrentInfo() {
  return (
    <div className='main'>
      <h3 className='city'>Kolkata, West Bengal, India</h3>
      <p className='date-time'>26 October 2020 06:27 AM</p>
      <section className='temperature'>
        <section className='current-temperature'>
          {24}°{`C`}
        </section>
        <section className='temperature-details'>
          <div className='temperature-high'>{32}°</div>
          <hr />
          <div className='temperature-low'>{18}°</div>
        </section>
      </section>

      <section className='weather-details-container'>
        <WeatherDetails
          icon='fas fa-water'
          title='Atmospheric Pressure'
          value='1000 hPa'
        />
        <WeatherDetails icon='fas fa-wind' title='Wind Speed' value='2 m/s' />
        <WeatherDetails icon='fas fa-cloud-rain' title='Rain' value='10 mm' />
        <WeatherDetails icon='fas fa-tint' title='Humidity' value='100%' />
      </section>
    </div>
  );
}
