import './Search.css';
import React, { useState } from 'react';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className='search-area'>
      <input
        type='text'
        value={searchTerm}
        placeholder='Enter your city name'
        onChange={({ target: { value } }) => setSearchTerm(value)}
      />
    </div>
  );
}
