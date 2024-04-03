import React from 'react';
import UserProfileMenu from '../userProfileMenu/UserProfileMenu';
import { IoMenu } from 'react-icons/io5';
import { userStore } from "../../stores/UserStore";
import WelcomeMessage from './WelcomeMessage';
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineMessage } from "react-icons/md";

const Header = ({ toggleSidebar, isSidebarVisible }) => {
  const username2 = userStore((state) => state.username);
  const hasNewMessage = true;
  const newNotificationCount = 5;

  return (
    <header className='bg-teal-950 border-b-2 text-white p-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          {!isSidebarVisible && ( // Render the icon only if the sidebar is not visible
            <IoMenu size={40} className='text-3xl cursor-pointer' onClick={toggleSidebar} />
          )}
          <WelcomeMessage username={username2} /> {/* Pass the username as prop */}
        </div>
        <div className='flex items-center space-x-6'>
          {/* Message icon with notification indicator */}
          <div className='relative'>
            <MdOutlineMessage size={25} className='text-3xl cursor-pointer'/>
            {hasNewMessage && (
              <div className='w-4 h-4 bg-red-500 rounded-full absolute -top-1 -right-2'></div>
            )}
          </div>
          {/* Notifications icon with notification counter */}
          <div className='relative'>
            <IoIosNotificationsOutline size={25} className='text-3xl cursor-pointer' />
            {newNotificationCount > 0 && (
              <div className='w-4 h-4 bg-red-500 rounded-full absolute -top-1 -right-1 flex justify-center items-center'>
                <span className='text-white text-xs'>{newNotificationCount}</span>
              </div>
            )}
          </div>
          <UserProfileMenu />
        </div>
      </div>
    </header>
  );
}

export default Header;
