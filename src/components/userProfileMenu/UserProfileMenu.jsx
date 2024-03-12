import React, { useState, useEffect } from 'react';
import { BiUser } from 'react-icons/bi';
import { useNavigate } from "react-router-dom";
import { userStore } from "../../stores/UserStore"

// ... (previous imports)

const UserProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoURL, setPhotoURL] = useState('');

  const navigate = useNavigate();
  const { token, clearUserData } = userStore.getState();
  console.log('Token:', token);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        // Make a request to your getPhoto endpoint with the user's token and username
        const response = await fetch('http://localhost:8080/demo-1.0-SNAPSHOT/rest/user/getPhoto', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'token': token,
            'username': userStore.getState().username, // Replace with the actual username from your state/store
          },
        });

        if (response.ok) {
          // Photo URL successfully fetched
          const photoURL = await response.json();
          console.log('Fetched Photo URL:', photoURL);
          setPhotoURL(photoURL);
        } else {
          // Fetching photo URL failed
          console.error('Fetching photo URL failed');
        }
      } catch (error) {
        console.error('Error during fetching photo URL:', error);
      }
    };

    // Fetch photo URL when the component mounts
    fetchPhoto();
  }, [token]);

  // Log the photoURL when it changes
  useEffect(() => {
    console.log('Updated Photo URL:', photoURL);
  }, [photoURL]);

  const handleProfileClick = () => {
    navigate('../Profile', { replace: true });
    setIsOpen(false);
  };

  const handleLogoutClick = async () => {
    try {
      // Make a request to your logout endpoint with the user's token
      const response = await fetch('http://localhost:8080/demo-1.0-SNAPSHOT/rest/user/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token,
        },
      });

      if (response.ok) {
        // Logout successful
        // You may want to clear user information from your state/store here
        clearUserData();
        setIsOpen(false);
        navigate('/', { replace: true });
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

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={toggleMenu}
          className="flex items-center focus:outline-none mr-6"
        >
          {photoURL ? (
            <img src={photoURL} alt="User" className="w-11 h-11 rounded-full border-black border-2 bg-white" />
          ) : (
            <BiUser className="text-2xl" />
          )}
        </button>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 -mr-4 mt-4 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="flex flex-col items-center py-1">
            <button
              href="#"
              onClick={handleProfileClick}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Profile
            </button>
            <button
              href="#"
              onClick={handleLogoutClick}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileMenu;

