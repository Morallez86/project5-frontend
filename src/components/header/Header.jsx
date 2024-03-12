import React from 'react';
import UserProfileMenu from '../userProfileMenu/UserProfileMenu';
import { userStore } from "../../stores/UserStore";

const Header = ({ username }) => {
  const username2 = userStore((state) => state.username);

  return (
    <header className='bg-blue-500 text-white p-4'>
      <div className='flex justify-between items-center'>
        <span className='text-lg font-bold'>Welcome, {username2}!</span>
        <UserProfileMenu />
      </div>
    </header>
  );
};

export default Header;
