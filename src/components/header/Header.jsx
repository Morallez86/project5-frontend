import React, { useEffect, useState } from 'react';
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
  const userId = userStore((state) => state.userId);
  const token = userStore((state) => state.token);
  const locale = userStore((state) => state.locale);
  const updateLocale = userStore((state) => state.updateLocale);
  const navigate = useNavigate();
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/demo-1.0-SNAPSHOT/websocket/notifications/${token}`);

    ws.onopen = () => {
      console.log('WebSocket connected for notifications and unread messages');
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'newMessage') {
        if (message.recipient === userId) {
          notificationsStore.addUnreadMessage(message);
        }
      } else if (message.type === 'newNotification') {
        notificationsStore.addUnreadNotification(message);
      }
    };

    return () => {
      ws.close();
    };
  }, [token, userId]);

  useEffect(() => {
    const handleUnreadMessagesChange = (state) => {
      setUnreadMessagesCount(state.unreadMessages.length);
    };


    const unsubscribeMessages = notificationsStore.subscribe(
      handleUnreadMessagesChange,
      (state) => state.unreadMessages.length
    );



    const fetchUnreadMessages = async () => {
      try {
        const response = await fetch(`http://localhost:8080/demo-1.0-SNAPSHOT/rest/messages/unread/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'token': token
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        notificationsStore.setState((state) => ({
          ...state,
          unreadMessages: data || [],
        }));
      } catch (error) {
        console.error('Error fetching unread messages:', error);
      }
    };

    const fetchUnreadNotifications = async () => {
      try {
        const response = await fetch(`http://localhost:8080/demo-1.0-SNAPSHOT/rest/notifications/unread/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'token': token
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        notificationsStore.setState((state) => ({
          ...state,
          unreadNotifications: data || [],
        }));
      } catch (error) {
        console.error('Error fetching unread notifications:', error);
      }
    };

    fetchUnreadMessages();
    fetchUnreadNotifications();

    return () => {
      unsubscribeMessages();
    };
  }, [userId, token]);

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
              {unreadMessagesCount > 0 && (
                <div className="w-4 h-4 bg-red-500 rounded-full absolute -top-1 -right-2"></div>
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
