import React from 'react';

const Header = ({ username }) => {
  return (
    <header className='bg-blue-500 text-white p-4'>
      <div>
        <span className='text-lg font-bold'>Welcome, {username}!</span>
      </div>
      {/* Other header content goes here */}
    </header>
  );
};

export default Header;