import './Search.css';
import React, { useState, useCallback, useEffect } from 'react';
import debounce from 'lodash/debounce';
import axios from 'axios';

export default function Search({ updateCoords }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [cities, setCities] = useState(null);
  const [error, setError] = useState(false);

  const getCityList = async (query) => {
    setError(false);
    const url = `https://api.locationiq.com/v1/autocomplete.php?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&q=${query}`;
    try {
      const result = await axios.get(url);
      const latAndLonMap = result.data.map(({ lat, lon, address }) => {
        const cityName = address.name || address.city || '';
        const state = address.state || '';
        const country = address.country || '';
        return {
          latitude: lat,
          longitude: lon,
          city: `${cityName}, ${state}${
            state.length > 0 ? ', ' : ''
          }${country}`,
        };
      });
      setCities(latAndLonMap);
    } catch (e) {
      setError(true);
    }
  };

  const makeRequest = useCallback(
    debounce((query) => getCityList(query), 250),
    [],
  );

  useEffect(() => {
    if (searchTerm.length > 2) {
      makeRequest(searchTerm);
    }
  }, [searchTerm]);

  const listOfOptions = () =>
    cities.map(({ city, latitude, longitude }, index) => {
      return (
        <>
          <div
            className='dropdown-items'
            key={index}
            onClick={() => {
              updateCoords({ latitude, longitude });
              setSearchTerm('');
              setCities(null);
            }}
          >
            {city}
          </div>
        </>
      );
    });

  return (
    <>
      <div className='search-area dropdown'>
        <div className='fixed-height red'>
          {error && 'Please check your spelling and try again!'}
        </div>
        <input
          type='text'
          value={searchTerm}
          placeholder='Enter a city name'
          onChange={({ target: { value } }) => {
            setSearchTerm(value);
          }}
          list='city-list'
        />
      </div>
      {cities && searchTerm.length > 0 && (
        <div className='dropdown-container'>{listOfOptions()}</div>
      )}
    </>
  );
}
