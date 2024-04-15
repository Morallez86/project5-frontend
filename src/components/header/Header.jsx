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

const Header = ({ toggleSidebar, isSidebarVisible }) => {
  const locale = userStore((state) => state.locale);
  const updateLocale = userStore((state) => state.updateLocale);
  const navigate = useNavigate();

  // Get all notifications from notificationsStore
  const notifications = notificationsStore((state) => state.notifications);

  // Calculate the number of unread notifications
  const unreadNotificationsCount = notifications.filter(notification => !notification.read).length;

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
            <WelcomeMessage />
            <select onChange={handleSelect} value={locale} className="text-black ml-2 rounded">
              {['en', 'pt'].map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <MdOutlineMessage
                size={25}
                className="text-3xl cursor-pointer"
                onClick={() => handleNavigation('/Chat')}
              />
              {unreadNotificationsCount > 0 && (
                <div className="w-4 h-4 bg-red-500 rounded-full absolute -top-1 -right-2">{unreadNotificationsCount}</div>
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
