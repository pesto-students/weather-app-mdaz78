import React from 'react';
import { getDateFrom } from '../../utils';
import './WeeklyForecasts.css';

export default function WeeklyForecast({ stats, timezone }) {
  const componentToRender = stats.map(
    ({ clouds, dt, humidity, pressure, wind_speed, temp }, index) => {
      const time = getDateFrom(dt, timezone);

      if (index === 0) {
        return null;
      } else {
        return (
          <div className='weekly-forecast-sub-container' key={index}>
            <h4>{time}</h4>
            <div className='weekly-forecast'>
              <i className='fas fa-temperature-low' />
              <p>{`${temp.day || '--'} °C`}</p>
            </div>
            <div className='weekly-forecast'>
              <i className='fas fa-water' />
              <p>{`${pressure || '--'} hPa`}</p>
            </div>
            <div className='weekly-forecast'>
              <i className='fas fa-wind' />
              <p>{`${wind_speed || '--'} m/s`}</p>
            </div>
            <div className='weekly-forecast'>
              <i className='fas fa-cloud' />
              <p>{`${clouds || '--'} %`}</p>
            </div>
            <div className='weekly-forecast'>
              <i className='fas fa-tint' />
              <p>{`${humidity || '--'}%`}</p>
            </div>
          </div>
        );
      }
    },
  );

  return (
    <div>
      <h4 className='hourly-forecast-heading'>Forecast of the Week</h4>
      <div className='weekly-forecast-container'>{componentToRender}</div>
    </div>
  );
}
