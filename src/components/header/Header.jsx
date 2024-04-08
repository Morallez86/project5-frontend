import React from 'react';
import { IntlProvider } from 'react-intl'; // Import IntlProvider from react-intl
import UserProfileMenu from '../userProfileMenu/UserProfileMenu';
import WelcomeMessage from './WelcomeMessage';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { MdOutlineMessage } from 'react-icons/md';
import languages from '../../translations'; // Import your translations
import { userStore } from '../../stores/UserStore';
import { IoMenu } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const Header = ({ toggleSidebar, isSidebarVisible }) => {
  const username = userStore((state) => state.username);
  const hasNewMessage = true;
  const newNotificationCount = 5;
  const locale = userStore((state) => state.locale);
  const updateLocale = userStore((state) => state.updateLocale);
  const navigate = useNavigate();

  const handleSelect = (event) => {
    updateLocale(event.target.value);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <IntlProvider locale={locale} messages={languages[locale]}>
      <header className="bg-teal-950 border-b-2 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {!isSidebarVisible && (
              <IoMenu size={40} className="text-3xl cursor-pointer" onClick={toggleSidebar} />
            )}
            <WelcomeMessage username={username} />
            <select onChange={handleSelect} value={locale} className="text-black ml-2 rounded">
              {['en', 'pt'].map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-6">
            {/* Message icon with notification indicator */}
            <div className="relative">
              <MdOutlineMessage size={25} className="text-3xl cursor-pointer" onClick={() => handleNavigation('/Chat')} />
              {hasNewMessage && (
                <div className="w-4 h-4 bg-red-500 rounded-full absolute -top-1 -right-2"></div>
              )}
            </div>
            {/* Notifications icon with notification counter */}
            <div className="relative">
              <IoIosNotificationsOutline size={25} className="text-3xl cursor-pointer" />
              {newNotificationCount > 0 && (
                <div className="w-4 h-4 bg-red-500 rounded-full absolute -top-1 -right-1 flex justify-center items-center">
                  <span className="text-white text-xs">{newNotificationCount}</span>
                </div>
              )}
            </div>
            <UserProfileMenu />
          </div>
        </div>
      </header>
    </IntlProvider>
  );
};

export default Header;
