import './FutureForecasts.css';
import React from 'react';
import HourlyForecast from '../hourly-forecast/HourlyForecasts';
import WeeklyForecast from '../weekly-forecast/WeeklyForecast';

export default function FutureForecasts({ dailyStats, hourlyStats, timezone }) {
  return (
    <div className='forecast-container'>
      <section className='hourly-forecast-main'>
        <HourlyForecast stats={hourlyStats} timezone={timezone} />
      </section>
      <section className='weekly-forecast-main'>
        <WeeklyForecast stats={dailyStats} timezone={timezone} />
      </section>
    </div>
  );
}
