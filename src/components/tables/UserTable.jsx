import React, { useState, useEffect, useCallback } from 'react';
import { userStore } from "../../stores/UserStore";
import { FaEdit } from "react-icons/fa";
import { ProfileStore } from "../../stores/ProfileStore";
import { useNavigate } from 'react-router-dom';
import WarningModal from '../modal/WarningModal';
import MessageModal from '../modal/MessageModal';
import languages from '../../translations';
import { FormattedMessage, IntlProvider } from 'react-intl';

function UserTable() {
  const locale = userStore((state) => state.locale);
  const [users, setUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const token = userStore((state) => state.token);
  const updateUserId = ProfileStore((state) => state.updateUserId);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUserIdsForDeletion, setSelectedUserIdsForDeletion] = useState([]);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const navigate = useNavigate(); // Get the navigate function
  const userRole = userStore((state) => state.role)
  const [searchInput, setSearchInput] = useState('');

  const fetchUsers = useCallback (async () => {
    try {
      const response = await fetch('http://localhost:8080/demo-1.0-SNAPSHOT/rest/users', {
        headers: {
          'token': token
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }, [token]);

  useEffect(() => {
    fetchUsers();
  }, [token, fetchUsers]);

  const handleEdit = (userId) => {
    updateUserId(userId);
    navigate('/Profile');
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const updatedUsers = users.map(user => {
      return { ...user, selected: !selectAll };
    });
    setUsers(updatedUsers);
  };

  const handleSetInactive = async () => {
    const selectedUserIds = users.filter(user => user.selected).map(user => user.id);
    try {
      const response = await fetch('http://localhost:8080/demo-1.0-SNAPSHOT/rest/users/updateInactive', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token
        },
        body: JSON.stringify(selectedUserIds)
      });
      if (!response.ok) {
        throw new Error('Failed to set users inactive');
      }
      fetchUsers();
    } catch (error) {
      console.error('Error setting users inactive:', error);
    }
  };

  const handleSetActive = async () => {
    const selectedUserIds = users.filter(user => user.selected).map(user => user.id);
    try {
      const response = await fetch('http://localhost:8080/demo-1.0-SNAPSHOT/rest/users/updateActive', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token
        },
        body: JSON.stringify(selectedUserIds)
      });
      if (!response.ok) {
        throw new Error('Failed to set users active');
      }
      fetchUsers();
    } catch (error) {
      console.error('Error setting users active:', error);
    }
  };

  const handleDeleteUsers = async () => {
    try {
      const response = await fetch('http://localhost:8080/demo-1.0-SNAPSHOT/rest/users/deleteUsers', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'token': token
        },
        body: JSON.stringify(selectedUserIdsForDeletion)
      });
      if (!response.ok) {
        throw new Error('Failed to delete users');
      }
      fetchUsers();
    } catch (error) {
      console.error('Error deleting users:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:8080/demo-1.0-SNAPSHOT/rest/users/search?query=${searchInput}`, {
        headers: {
          'token': token
        }
      });
      if (!response.ok) {
        throw new Error('Failed to search users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const handleCheckboxChange = (userId) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return { ...user, selected: !user.selected };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const handleDeleteButtonClick = () => {
    // Get the IDs of selected tasks for deletion
    const selectedIds = users.filter(user => user.selected).map(user => user.id);
    setSelectedUserIdsForDeletion(selectedIds);
    // Check if any selected user is active
    const isActiveUserSelected = users.some(user => user.selected && user.active);
    if (isActiveUserSelected) {
      // If active user is selected, show message modal
      setShowMessageModal(true);
    } else {
      // If no active user is selected, show delete modal directly
      setShowDeleteModal(true);
    }
  };

  return (
    <IntlProvider locale={locale} messages={languages[locale]}>
    <div className="text-white p-8 flex h-full justify-center">
      {/* Show the MessageModal if showMessageModal is true */}
      <MessageModal 
        isOpen={showMessageModal} 
        onClose={() => setShowMessageModal(false)} 
        title="Warning"
        message="Active users cannot be deleted."
      />
      <WarningModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Are you sure you want to permanently delete this/these users?"
        message="Deleted users cannot be recovered."
        buttonText="Delete"
        onButtonClick={handleDeleteUsers}
      />
    <div className="bg-cyan-900/60 border border-cyan-950 rounded-md p-14 backdrop-filter backdrop-blur-sm bg-opacity-30 text-center">
      <div className="justify-center items-center">
        <h1 className="text-2xl font-bold">
          <FormattedMessage id="managingUsers" defaultMessage="Managing Users" />
        </h1>
        <div className="flex items-center">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 text-black rounded-md mr-2"
            placeholder={languages[locale].searchUsername}  
          />
          <button
            type="button"
            onClick={handleSearch}
            className="px-4 py-2 bg-cyan-900 text-white rounded hover:bg-cyan-950"
          >
            <FormattedMessage id="searchButton" defaultMessage="Search" />
          </button>
        </div>
        <div className='overflow-y-auto h-96 mt-1'>
        <table className="w-full mt-4 border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-2 border border-gray-300">
                <input type="checkbox" checked={selectAll || false} onChange={handleSelectAll} />
              </th>
              <th className="px-6 py-2 border border-gray-300"><FormattedMessage id="emailProfile" defaultMessage="Email" /></th>
              <th className="px-6 py-2 border border-gray-300"><FormattedMessage id="usernameLabel" defaultMessage="username" /></th>
              <th className="px-6 py-2 border border-gray-300"><FormattedMessage id="firstNameProfile" defaultMessage="First Name" /></th>
              <th className="px-6 py-2 border border-gray-300"><FormattedMessage id="lastNameProfile" defaultMessage="Last Name" /></th>
              <th className="px-6 py-2 border border-gray-300"><FormattedMessage id="job" defaultMessage="Job" /></th>
              <th className="px-6 py-2 border border-gray-300"><FormattedMessage id="stateT" defaultMessage="State" /></th>
              <th className="px-6 py-2 border border-gray-300"><FormattedMessage id="editT" defaultMessage="Edit" /></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className='text-center'>
                <td className="px-6 py-2 border border-gray-300">
                  <input type="checkbox" checked={user.selected || false} onChange={() => handleCheckboxChange(user.id)} />
                </td>
                <td className="px-6 py-2 border border-gray-300">{user.email}</td>
                <td className="px-6 py-2 border border-gray-300">{user.username}</td>
                <td className="px-6 py-2 border border-gray-300">{user.firstname}</td>
                <td className="px-6 py-2 border border-gray-300">{user.lastname}</td>
                <td className="px-6 py-2 border border-gray-300">{user.role}</td>
                <td className="px-6 py-2 border border-gray-300">{user.active ? 'Active' : 'Inactive'}</td>
                <td className="px-8 py-2 border border-gray-300">
                <button onClick={() => handleEdit(user.id)} className="focus:outline-none">
                    <FaEdit className="cursor-pointer hover:text-blue-500" />
                </button>
                </td>   
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <div className="flex mt-4 justify-between">
          {userRole === 'po' && (
            <div>
              <button
                type="button"
                onClick={handleSetInactive}
                className="px-4 py-2 bg-cyan-900 text-white rounded hover:bg-cyan-950 mr-2"
              >
                <FormattedMessage id="setInactiveButton" defaultMessage="inactive"/>
              </button>
              <button
                type="button"
                onClick={handleSetActive}
                className="px-4 py-2 bg-cyan-900 text-white rounded hover:bg-cyan-950 mr-2"
              >
                <FormattedMessage id="setActiveButton" defaultMessage="Set Active"/>
              </button>
            </div>
          )}
          {userRole === 'po' && (
              <button
                type="button"
                onClick={handleDeleteButtonClick}
                className="px-4 py-2 bg-red-900 text-white rounded hover:bg-red-950"
              >
                <FormattedMessage id="deleteButton" defaultMessage="delete"/>
              </button>
            )}
        </div>
      </div>
    </div>
  </div>
  </IntlProvider>
);
}

export default UserTable;
