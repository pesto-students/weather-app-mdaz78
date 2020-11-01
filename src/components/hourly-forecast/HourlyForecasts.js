import './HourlyForecasts.css';
import React from 'react';
import { getTimeFrom } from '../../utils';

export default function HourlyForecasts({ stats, timezone }) {
  const componentToRender = stats.map(
    ({ clouds, dt, humidity, pressure, wind_speed, temp }) => {
      const time = getTimeFrom(dt, timezone);
      return (
        <div className='hourly-forecast-sub-container'>
          <h4>{time}</h4>
          <div className='hourly-forecast'>
            <i className='fas fa-temperature-low' />
            <p>{`${temp || '--'} °C`}</p>
          </div>
          <div className='hourly-forecast'>
            <i className='fas fa-water' />
            <p>{`${pressure || '--'} hPa`}</p>
          </div>
          <div className='hourly-forecast'>
            <i className='fas fa-wind' />
            <p>{`${wind_speed || '--'} m/s`}</p>
          </div>
          <div className='hourly-forecast'>
            <i className='fas fa-cloud' />
            <p>{`${clouds || '--'} %`}</p>
          </div>
          <div className='hourly-forecast'>
            <i className='fas fa-tint' />
            <p>{`${humidity || '--'}%`}</p>
          </div>
        </div>
      );
    },
  );

  return (
    <div>
      <h4 className='hourly-forecast-heading'>Hourly Forecast</h4>
      <div className='hourly-forecast-container'>{componentToRender}</div>
    </div>
  );
}
