import React, { useState, useEffect } from 'react';
import { userStore } from "../../stores/UserStore";
import { FaEdit } from "react-icons/fa";
import { ProfileStore } from "../../stores/ProfileStore";
import { useNavigate } from 'react-router-dom';

function UserTable() {
  const [users, setUsers] = useState([]);
  const token = userStore((state) => state.token);
  const updateUserId = ProfileStore((state) => state.updateUserId);
  const navigate = useNavigate(); // Get the navigate function

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/demo-1.0-SNAPSHOT/rest/user/all', {
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
    };

    fetchUsers();
  }, [token]);

  const handleEdit = (userId) => {
    updateUserId(userId);
    navigate('/Profile');
    console.log(`Editing user with ID: ${userId}`);
  };

  return (
    <div className="bg-cyan-900/60 border border-cyan-950 rounded-md p-14 backdrop-filter backdrop-blur-sm bg-opacity-30 text-center">
      <div className="justify-center items-center">
        <h1 className="text-2xl font-bold">Managing Users</h1>
        <table className="w-full mt-4 border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-2 border border-gray-300"></th>
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
                  <input type="checkbox" />
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
        <div className="flex mt-4 justify-between">
          <button type="button" id="ResetChecks" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2">
            Uncheck
          </button>
          <button type="button" id="Inactivate" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2">
            Set Inactive
          </button>
          <button type="button" id="DeleteTask" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserTable;
