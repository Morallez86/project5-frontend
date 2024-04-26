import React from 'react';
import { IntlProvider } from 'react-intl';
import UserProfileMenu from '../userProfileMenu/UserProfileMenu';
import WelcomeMessage from './WelcomeMessage';
import { MdOutlineMessage } from 'react-icons/md';
import languages from '../../translations';
import { userStore } from '../../stores/UserStore';
import { IoMenu } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { notificationsStore } from '../../stores/NotificationsStore';
import NotificationMenu from '../userProfileMenu/NotificationMenu';
import LanguageSelector from '../languageSelector/LanguageSelector'; // Import LanguageSelector component

const Header = ({ toggleSidebar, isSidebarVisible }) => {
  const locale = userStore((state) => state.locale);
  const username = userStore((state) => state.username);
  const setLocale = userStore((state) => state.setLocale); // Retrieve setLocale function
  const navigate = useNavigate();

  // Get all unread messages from notificationsStore
  const unreadMessages = notificationsStore((state) => state.unreadMessages);

  // Calculate the number of unread messages
  const unreadMessagesCount = unreadMessages.length;

  const handleLocaleChange = (selectedLocale) => {
    setLocale(selectedLocale); // Set the new locale/language
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
            {/* Render LanguageSelector component for language selection */}
            <LanguageSelector
              locale={locale}
              onLocaleChange={handleLocaleChange}
            />
          </div>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <MdOutlineMessage
                size={25}
                className="text-3xl cursor-pointer"
                onClick={() => handleNavigation('/Chat')}
              />
              {unreadMessagesCount > 0 && (
                <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center absolute -top-1 -right-2">{unreadMessagesCount}</div>
              )}
            </div>
            <NotificationMenu />
            <UserProfileMenu />
          </div>
        </div>
      </header>
    </IntlProvider>
  );
};

export default Header;
