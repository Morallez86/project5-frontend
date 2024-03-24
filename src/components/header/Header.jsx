// Header.jsx
import React from 'react';
import UserProfileMenu from '../userProfileMenu/UserProfileMenu';
import { IoMenu } from 'react-icons/io5';
import { userStore } from "../../stores/UserStore";
import WelcomeMessage from './WelcomeMessage'; // Import the WelcomeMessage component

const Header = ({ toggleSidebar, isSidebarVisible }) => {
  const username2 = userStore((state) => state.username);

  return (
    <header className='bg-teal-950 border-b-2 text-white p-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          {!isSidebarVisible && ( // Render the icon only if the sidebar is not visible
            <IoMenu size={40} className='text-3xl cursor-pointer' onClick={toggleSidebar} />
          )}
          <WelcomeMessage username={username2} /> {/* Pass the username as prop */}
        </div>
        <UserProfileMenu />
      </div>
    </header>
  );
}

export default Header;
