import React, { useState, useEffect } from 'react';
import { userStore } from "../../stores/UserStore";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { MdPriorityHigh } from "react-icons/md";
import { taskStore } from "../../stores/TaskStore";

function TaskTable() {
  const [users, setUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const token = userStore((state) => state.token);
  const { updateTaskId, updateTaskOwner } = taskStore(); 
  const navigate = useNavigate(); // Get the navigate function

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/demo-1.0-SNAPSHOT/rest/task/allManagingTasks', {
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

  const handleEdit = (id, owner) => {
    // Set the task ID in the task storage
    updateTaskId(id);
    updateTaskOwner(owner);
    // Navigate to EditTask
    navigate('/EditTask');
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 100:
        return 'bg-green-500';
      case 200:
        return 'bg-yellow-500';
      case 300:
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getPriorityTooltip = (priority) => {
    switch (priority) {
      case 100:
        return 'Low Priority';
      case 200:
        return 'Medium Priority';
      case 300:
        return 'High Priority';
      default:
        return '';
    }
  };

  const getStatusDisplay = (status) => {
    switch (status) {
      case 100:
        return 'To Do';
      case 200:
        return 'Doing';
      case 300:
        return 'Done';
      default:
        return '';
    }
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const updatedUsers = users.map(user => {
      return { ...user, selected: !selectAll };
    });
    setUsers(updatedUsers);
  };

  const handleCheckboxChange = (taskId) => {
    const updatedUsers = users.map(user => {
      if (user.id === taskId) {
        return { ...user, selected: !user.selected };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  return (
    <div className="bg-cyan-900/60 border border-cyan-950 rounded-md p-14 backdrop-filter backdrop-blur-sm bg-opacity-30 text-center">
      <div className="justify-center items-center">
        <h1 className="text-2xl font-bold">Managing Tasks</h1>
        <table className="w-full mt-4 border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-2 border border-gray-300">
                <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
              </th>
              <th className="px-6 py-2 border border-gray-300">Title</th>
              <th className="px-6 py-2 border border-gray-300">Owner</th>
              <th className="px-6 py-2 border border-gray-300">Category</th>
              <th className="px-6 py-2 border border-gray-300">Status</th>
              <th className="px-6 py-2 border border-gray-300">State</th>
              <th className="px-6 py-2 border border-gray-300">Edit</th>
            </tr>
          </thead>
          <tbody>
            {users.map(task => (
              <tr key={task.id} className='text-center'>
                <td className="px-6 py-2 border border-gray-300">
                  <input type="checkbox" checked={task.selected} onChange={() => handleCheckboxChange(task.id)} />
                </td>
                <td className="px-6 py-2 border border-gray-300">
                  <div className="grid grid-cols-2 items-center">
                    <span className="col-span-1">{task.title}</span>
                    <span className="col-span-1 flex justify-end" title={getPriorityTooltip(task.priority)}>
                      <MdPriorityHigh className={`text-white rounded-full h-4 w-4 ${getPriorityColor(task.priority)}`} />
                    </span>
                  </div>
                </td>
                <td className="px-6 py-2 border border-gray-300">
                  <div className="flex items-center">
                    <img
                      src={task.owner.photoURL}
                      alt={task.owner.username}
                      className="h-8 w-8 rounded-full mr-2"
                    />
                    <span>{task.owner.username}</span>
                  </div>
                </td>
                <td className="px-6 py-2 border border-gray-300" >{task.category.title}</td>
                <td className="px-6 py-2 border border-gray-300" title={getStatusDisplay(task.status)}>
                  {getStatusDisplay(task.status)}
                </td>
                <td className="px-6 py-2 border border-gray-300">{task.active ? 'Active' : 'Inactive'}</td>
                <td className="px-8 py-2 border border-gray-300">
                  <button onClick={() => handleEdit(task.id, task.owner.username)} className="focus:outline-none">
                    <FaEdit className="cursor-pointer hover:text-blue-500" />
                  </button>
                </td>   
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex mt-4 justify-between">
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

export default TaskTable;
