import React, { useState, useEffect, useRef } from 'react';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { notificationsStore } from '../../stores/NotificationsStore';

const NotificationMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const menuRef = useRef();
  

  useEffect(() => {
    const handleUnreadChange = (state) => {
      setNotifications(state.unreadNotifications);
    };

    const unsubscribe = notificationsStore.subscribe(handleUnreadChange, (state) => state.unreadNotifications);

    return () => {
      unsubscribe();
    };
  }, []);

  const handleNavigate = (notification) => {
    navigate(`/notifications/${notification.id}`);
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <div>
        <button type="button" onClick={toggleMenu} className="flex items-center focus:outline-none mr-6 relative">
          <IoIosNotificationsOutline size={25} className="text-3xl cursor-pointer" />
          {notifications.length > 0 && (
            <div className="w-4 h-4 bg-red-500 rounded-full absolute -top-1 -right-1 flex justify-center items-center text-white text-xs">
              {notifications.length}
            </div>
          )}
        </button>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-6 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="py-1">
            {notifications.map((notification) => (
              <button
                key={notification.id}
                onClick={() => handleNavigate(notification)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                {notification.message} - From: {notification.senderId}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationMenu;
