import React from 'react';
import './Error.css';

export default function Error({ message }) {
  return (
    <div className='error-area'>
      <h4 className='error-message'>{message}</h4>
    </div>
  );
}
