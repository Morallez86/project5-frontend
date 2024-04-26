import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { userStore } from "../../stores/UserStore";
import { ProfileStore } from "../../stores/ProfileStore";
import { taskStore } from '../../stores/TaskStore';
import { FaRegSave } from "react-icons/fa";
import languages from '../../translations';
import { FormattedMessage, IntlProvider } from 'react-intl';


const UserProfileMenu = () => {
  const locale = userStore((state) => state.locale);
  const [isOpen, setIsOpen] = useState(false);
  const [photoURL, setPhotoURL] = useState('');
  const updateUserId = ProfileStore((state) => state.updateUserId);
  const clearUserId = ProfileStore((state) => state.clearUserId);
  const clearTaskData = taskStore((state) => state.clearTaskData);
  const navigate = useNavigate();
  const { token, username, clearUserData } = userStore.getState();
  const menuRef = useRef();
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [currentTokenExpirationTime, setCurrentTokenExpirationTime] = useState(null);
  

  useEffect(() => {
    const fetchPhoto = async () => {
      if (token !== null && userStore.getState().username !== null) {
        try {
          const response = await fetch('http://localhost:8080/demo-1.0-SNAPSHOT/rest/users/photo', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'token': token,
              'username': userStore.getState().username,
            },
          });

          if (response.ok) {
            const photoURL = await response.json();
            setPhotoURL(photoURL);
          } else {
            console.error('Fetching photo URL failed');
          }
        } catch (error) {
          console.error('Error during fetching photo URL:', error);
        }
      }
    };

    const fetchCurrentTokenExpirationTime = async () => {
      try {
        const response = await fetch('http://localhost:8080/demo-1.0-SNAPSHOT/rest/configurations/currentTokenExpirationTime', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'token': token,
          },
        });

        if (response.ok) {
          const { tokenExpirationTime } = await response.json();
          setCurrentTokenExpirationTime(tokenExpirationTime);
        } else {
          console.error('Failed to fetch current token expiration time');
        }
      } catch (error) {
        console.error('Error fetching current token expiration time:', error);
      }
    };

    fetchPhoto();
    fetchCurrentTokenExpirationTime();
  }, [token]);



  const handleProfileClick = () => {
    updateUserId(0);
    navigate('../Profile', { replace: true });
    setIsOpen(false);
  };

  const handleLogoutClick = async () => {
      try {
          // Make a request to your logout endpoint with the user's token
          const response = await fetch('http://localhost:8080/demo-1.0-SNAPSHOT/rest/users/logout', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  username: username,
                  token: token,
              }),
          });
          if (response.ok) {
              // Logout successful
              clearUserData();
              clearTaskData();
              clearUserId();
              navigate('/', { replace: true });
              setIsOpen(false);
          } else {
              // Logout failed
              console.error('Logout failed');
          }
      } catch (error) {
          console.error('Error during logout:', error);
      }
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

  const handleSettingsClick = (event) => {
    if(!showSubmenu){
      setShowSubmenu(true);
    }else{
      setShowSubmenu(false);
    }
  };

  const handleSaveChanges = async () => {
    // Ensure currentTokenExpirationTime is converted to an integer before sending
    const newTokenExpirationTime = parseInt(currentTokenExpirationTime, 10);
    console.log(newTokenExpirationTime)
    if (!isNaN(newTokenExpirationTime)) {
      try {
        const response = await fetch('http://localhost:8080/demo-1.0-SNAPSHOT/rest/configurations/updateTokenExpirationTime', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'token': token
          },
          body: newTokenExpirationTime
        });

        if (response.ok) {
          console.log('Token expiration time updated successfully');
        } else {
          console.error('Failed to update token expiration time');
        }
      } catch (error) {
        console.error('Error updating token expiration time:', error);
      }
    } else {
      console.error('Invalid token expiration time format');
    }
  };

  return (
    <IntlProvider locale={locale} messages={languages[locale]}>
    <div className="relative inline-block text-left" ref={menuRef}>
      <div>
        <button
          type="button"
          onClick={toggleMenu}
          className="flex items-center focus:outline-none mr-6"
        >
          {photoURL ? (
            <img src={photoURL} alt="User" className="w-11 h-11 rounded-full border-black border-2 bg-white" />
          ) : (
            <FaRegSave className="text-sm" />
          )}
        </button>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 -mr-4 mt-4 w-32 rounded-md shadow-lg  bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="flex flex-col  items-center py-1 border rounded border-black">
            <button
              onClick={handleProfileClick}
              className="block px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-400"
            >
              <FormattedMessage id="profile" defaultMessage="Profile" />
            </button>
            <button
              onClick={handleSettingsClick}
              className="block px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-400"
            >
              <FormattedMessage id="settings" defaultMessage="Settings" />
            </button>
            {showSubmenu && (
              <div
                className="origin-top-left flex items-center flex-col border border-black absolute z-10 w-36 p-1 py-2 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                style={{ top: 29, right: 128}}
              >
                <label className="block px-4  py-b-2 w-full text-sm text-gray-700 hover:bg-gray-100">
                  <FormattedMessage id="tokenTimeout" defaultMessage="Token Timeout" />
                </label>
                <div className="flex flex-row justify-between  items-center w-full mt-2">
                  <div className='flex'>
                  <input
                    type="text"
                    className="block w-1/3 h-6 py-2 text-xs text-black border border-gray-300 focus:border-cyan-950"
                    name="tokenTimeout"
                    value={currentTokenExpirationTime}
                    onChange={(e) => setCurrentTokenExpirationTime(e.target.value)}
                  />
                  <p className='text-black ml-1 w-1/3 text-sm'><FormattedMessage id="hours" defaultMessage="hours" /></p>
                  </div>
                  <div className='flex place-item-end'>
                    <button
                      className="py-1 w-6 text-sm text-white bg-gray-600 hover:bg-cyan-950 rounded-md flex items-center justify-center"
                      onClick={handleSaveChanges}
                    >
                      <FaRegSave className="w-3" />
                    </button>
                  </div>
                </div>
              </div>
            )}
            <button
              onClick={handleLogoutClick}
              className="block px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-400"
            >
              <FormattedMessage id="logout" defaultMessage="Logout" />
            </button>
          </div>
        </div>
      )}
    </div>
    </IntlProvider>
  );
};

export default UserProfileMenu;
