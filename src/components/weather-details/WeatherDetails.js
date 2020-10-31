import './WeatherDetails.css';
import React from 'react';

// TODO: Remember to remove font-awesome from package.json

export default function WeatherDetails({ icon, title, value }) {
  return (
    <div className='weather-container'>
      <i className={icon} />
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}
