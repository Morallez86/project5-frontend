// WelcomeMessage.jsx
import React from 'react';

const WelcomeMessage = ({ username }) => {
  return (
    <span className='text-lg font-bold ml-4'>Welcome, {username}!</span>
  );
}

export default WelcomeMessage;
