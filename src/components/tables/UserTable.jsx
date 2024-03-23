import React, { useState, useEffect, useCallback } from 'react';
import { userStore } from "../../stores/UserStore";
import { FaEdit } from "react-icons/fa";
import { ProfileStore } from "../../stores/ProfileStore";
import { useNavigate } from 'react-router-dom';
import WarningModal from '../modal/WarningModal';
import MessageModal from '../modal/MessageModal';

function UserTable() {
  const [users, setUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const token = userStore((state) => state.token);
  const updateUserId = ProfileStore((state) => state.updateUserId);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUserIdsForDeletion, setSelectedUserIdsForDeletion] = useState([]);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const navigate = useNavigate(); // Get the navigate function
  const userRole = userStore((state) => state.role)

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
      console.log(data);
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
    console.log(`Editing user with ID: ${userId}`);
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
    console.log(selectedUserIds);
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
    console.log(selectedUserIds);
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
    const selectedUserIds = users.filter(user => user.selected).map(user => user.id);
    console.log(selectedUserIds);
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
        <h1 className="text-2xl font-bold">Managing Users</h1>
        <div className='overflow-y-auto h-96 mt-1'>
        <table className="w-full mt-4 border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-2 border border-gray-300">
                <input type="checkbox" checked={selectAll || false} onChange={handleSelectAll} />
              </th>
              <th className="px-6 py-2 border border-gray-300">Email</th>
              <th className="px-6 py-2 border border-gray-300">Username</th>
              <th className="px-6 py-2 border border-gray-300">First Name</th>
              <th className="px-6 py-2 border border-gray-300">Last Name</th>
              <th className="px-6 py-2 border border-gray-300">State</th>
              <th className="px-6 py-2 border border-gray-300">Edit</th>
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
                Set Inactive
              </button>
              <button
                type="button"
                onClick={handleSetActive}
                className="px-4 py-2 bg-cyan-900 text-white rounded hover:bg-cyan-950 mr-2"
              >
                Set Active
              </button>
            </div>
          )}
          {userRole === 'po' && (
              <button
                type="button"
                onClick={handleDeleteButtonClick}
                className="px-4 py-2 bg-red-900 text-white rounded hover:bg-red-950"
              >
                Delete
              </button>
            )}
        </div>
      </div>
    </div>
  </div>
);
}

export default UserTable;
