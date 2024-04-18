import React, { useState, useEffect, useRef } from 'react';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { notificationsStore } from '../../stores/NotificationsStore';
import { userStore } from '../../stores/UserStore';

const NotificationMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(notificationsStore.getState().notifications || []);
  const navigate = useNavigate();
  const menuRef = useRef();
  const userId = userStore((state) => state.userId); 
  const token = userStore((state) => state.token); 

  useEffect(() => {
    const handleNotificationsChange = (state) => {
      setNotifications(state.notifications || []);
    };

    // Subscribe to changes in notificationsStore
    const unsubscribe = notificationsStore.subscribe(handleNotificationsChange);

    // Cleanup function to unsubscribe when component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  const handleNavigate = () => {
    // Mark notifications as read before navigating
    markNotificationsAsRead();
    navigate(`/chat`);
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleOutsideClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      // Mark notifications as read when clicking outside
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const markNotificationsAsRead = () => {
    fetch(`http://localhost:8080/demo-1.0-SNAPSHOT/rest/notifications/read/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'token': token,
      },
    })
    .then((response) => {
      if (response.ok) {
        // Clear notifications if the response is ok
        notificationsStore.getState().clearNotifications();
      } else {
        console.error('Failed to mark notifications as read.');
      }
    })
    .catch((error) => {
      console.error('Error marking notifications as read:', error);
    });
  };

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
                onClick={() => handleNavigate()}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                {notification.message}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationMenu;
