import React, { useState, useEffect, useCallback } from 'react';
import { userStore } from "../../stores/UserStore";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { MdPriorityHigh } from "react-icons/md";
import { taskStore } from "../../stores/TaskStore";
import WarningModal from '../modal/WarningModal';

function TaskTable() {
  const [tasks, setTasks] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const token = userStore((state) => state.token);
  const { updateTaskId, updateTaskOwner } = taskStore(); 
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [owner, setOwner] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTaskIdsForDeletion, setSelectedTaskIdsForDeletion] = useState([]);
  const userRole = userStore((state) => state.role)

  const fetchTasks = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8080/demo-1.0-SNAPSHOT/rest/tasks/allManagingTasks', {
        headers: {
          'token': token
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      console.log(data);
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }, [token]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks, token]);

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
    const updatedTasks = tasks.map(task => {
      return { ...task, selected: !selectAll };
    });
    setTasks(updatedTasks);
  };

  const handleCheckboxChange = (taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, selected: !task.selected };
      }
      return task;
    });
    setTasks(updatedTasks);
  };


  const handleSetInactive = async () => {
    const selectedTaskIds = tasks.filter(task => task.selected).map(task => task.id);
    console.log(selectedTaskIds);
    try {
      const response = await fetch('http://localhost:8080/demo-1.0-SNAPSHOT/rest/tasks/deactivate', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'token': token
        },
        body: JSON.stringify(selectedTaskIds)
      });
      if (!response.ok) {
        throw new Error('Failed to set tasks inactive');
      }
      // Refresh the task list after setting tasks inactive
      fetchTasks();
    } catch (error) {
      console.error('Error setting tasks inactive:', error);
    }
  };

  const handleCategorySearch = async () => {
    // Fetch tasks based on the category input
    try {
        const response = await fetch(`http://localhost:8080/demo-1.0-SNAPSHOT/rest/tasks/allManagingTasks?category=${category}`, {
            headers: {
                'token': token
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        console.log(data);
        setTasks(data);
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
  };

  const handleOwnerSearch = async () => {
    // Fetch tasks based on the owner input
    try {
        const response = await fetch(`http://localhost:8080/demo-1.0-SNAPSHOT/rest/tasks/allManagingTasks?owner=${owner}`, {
            headers: {
                'token': token
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        console.log(data);
        setTasks(data);
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
};

  const handleInactiveSearch = async () => {
    try {
      const response = await fetch('http://localhost:8080/demo-1.0-SNAPSHOT/rest/tasks/inactive', {
        headers: {
          'token': token
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch inactive tasks');
      }
      const data = await response.json();
      console.log(data);
      setTasks(data);
    } catch (error) {
      console.error('Error fetching inactive tasks:', error);
    }
  };

  const handleSetActive = async () => {
    const selectedTaskIds = tasks.filter(task => task.selected).map(task => task.id);
    console.log(selectedTaskIds);
    try {
      const response = await fetch('http://localhost:8080/demo-1.0-SNAPSHOT/rest/tasks/activate', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'token': token
        },
        body: JSON.stringify(selectedTaskIds)
      });
      if (!response.ok) {
        throw new Error('Failed to set tasks active');
      }
      // Refresh the task list after setting tasks active
      fetchTasks();
    } catch (error) {
      console.error('Error setting tasks active:', error);
    }
  };

  const handleDeleteButtonClick = () => {
    // Get the IDs of selected tasks for deletion
    const selectedIds = tasks.filter(task => task.selected).map(task => task.id);
    setSelectedTaskIdsForDeletion(selectedIds);
    // Open the delete modal
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      const response = await fetch('http://localhost:8080/demo-1.0-SNAPSHOT/rest/tasks/deleteTasks', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'token': token
        },
        body: JSON.stringify(selectedTaskIdsForDeletion)
      });
      if (!response.ok) {
        throw new Error('Failed delete tasks');
      }
      // Refresh the task list after setting tasks active
      fetchTasks();
      // Close the delete modal
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting tasks:', error);
    }
  };

  return (
    <div className='p-8'>
    <div className="text-white flex justify-center items-center">
      <WarningModal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            title="Are you sure you want to permanently delete this/these tasks?"
            message="Deleted tasks cannot be recovered."
            buttonText="Delete"
            onButtonClick={handleDeleteConfirmed}
      />
    <div className="bg-cyan-900/60 border border-cyan-950 rounded-md p-14 backdrop-filter backdrop-blur-sm bg-opacity-30 text-center">
      
      <div>
        <h1 className="text-2xl font-bold mb-4">Managing Tasks</h1>
        <div className="flex justify-between">
          <div className="flex space-x-1 mr-4">
            <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} className="px-2 py-1 border rounded border-gray-300 text-black" />
            <button onClick={handleCategorySearch} className="px-4 py-1 bg-slate-400 text-white rounded hover:bg-slate-500">Search</button>
            <input type="text" placeholder="Owner" value={owner} onChange={(e) => setOwner(e.target.value)} className="px-2 py-1 border rounded border-gray-300 text-black" />
            <button onClick={handleOwnerSearch} className="px-4 py-1 bg-slate-400 text-white rounded hover:bg-slate-500">Search</button>
          </div>
          <div className="flex space-x-1">
            <button onClick={handleInactiveSearch} className="px-4 py-1 bg-cyan-900 text-white rounded hover:bg-cyan-950">Inactive Tasks</button>
            <button onClick={fetchTasks} className="px-4 py-1 bg-cyan-900 text-white rounded hover:bg-cyan-950">Reset</button>
          </div>
        </div>
        <div className='overflow-y-auto max-h-96 border-b border-t mt-1'>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-2 border border-gray-300">
                <input type="checkbox" checked={selectAll || false} onChange={handleSelectAll} />
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
            {tasks.map(task => (
              <tr key={task.id} className='text-center'>
                <td className="px-6 py-2 border border-gray-300">
                  <input type="checkbox" checked={task.selected || false} onChange={() => handleCheckboxChange(task.id)} />
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
                    <FaEdit className="cursor-pointer" />
                  </button>
                </td>   
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <div className="flex mt-4 justify-between">
          <div>
            <button type="button" onClick={handleSetActive} className="px-4 py-2 bg-cyan-900 text-white rounded hover:bg-cyan-950 mr-2">
              Set Active
            </button>
            <button type="button" onClick={handleSetInactive} className="px-4 py-2 bg-cyan-900 text-white rounded hover:bg-cyan-950 mr-2">
              Set Inactive
            </button>
          </div>
          {userRole === "po" && (
            <button type="button" onClick={handleDeleteButtonClick} className="px-4 py-2 bg-red-900 text-white rounded hover:bg-red-950">
            Delete
            </button>
          )}
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}

export default TaskTable;
