// Header.jsx
import React from 'react';
import UserProfileMenu from '../userProfileMenu/UserProfileMenu';
import { IoMenu } from 'react-icons/io5';
import { userStore } from "../../stores/UserStore";

const Header = ({ toggleSidebar, isSidebarVisible }) => {
  const username2 = userStore((state) => state.username);

  return (
    <header className='bg-teal-950 text-white p-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          {!isSidebarVisible && ( // Render the icon only if the sidebar is not visible
            <IoMenu size={40} className='text-3xl cursor-pointer' onClick={toggleSidebar} />
          )}
          <span className='text-lg font-bold ml-4'>Welcome, {username2}!</span>
        </div>
        <UserProfileMenu />
      </div>
    </header>
  );
}

export default Header;
