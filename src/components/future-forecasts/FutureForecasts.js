import './FutureForecasts.css';
import React from 'react';
import HourlyForecast from '../hourly-forecast/HourlyForecasts';
import WeeklyForecast from '../weekly-forecast/WeeklyForecast';

export default function FutureForecasts() {
  return (
    <div className='forecast-container'>
      <section className='hourly-forecast-main'>
        <HourlyForecast />
      </section>
      <section className='weekly-forecast-main'>
        <WeeklyForecast />
      </section>
    </div>
  );
}
