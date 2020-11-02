import './Search.css';
import React, { useState, useCallback, useEffect } from 'react';
import debounce from 'lodash/debounce';
import axios from 'axios';

export default function Search({ updateCoords }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [cities, setCities] = useState(null);

  const getCityList = async (query) => {
    const url = `https://api.locationiq.com/v1/autocomplete.php?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&q=${query}`;
    const result = await axios.get(url);
    const latAndLonMap = result.data.map(({ lat, lon, address }) => {
      const cityName = address.name || address.city || '';
      const state = address.state || '';
      const country = address.country || '';
      return {
        latitude: lat,
        longitude: lon,
        city: `${cityName}, ${state}${state.length > 0 ? ', ' : ''}${country}`,
      };
    });
    setCities(latAndLonMap);
  };

  const makeRequest = useCallback(
    debounce((query) => getCityList(query), 500),
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
          <h3
            key={index}
            onClick={() => {
              updateCoords({ latitude, longitude });
              setSearchTerm('');
            }}
          >
            {city}
          </h3>
        </>
      );
    });

  return (
    <>
      <div className='search-area'>
        <input
          type='text'
          value={searchTerm}
          placeholder='Enter your city name'
          onChange={({ target: { value } }) => {
            setSearchTerm(value);
          }}
          list='city-list'
        />
        {cities && <div className='dropdown-container'>{listOfOptions()}</div>}
      </div>
    </>
  );
}
