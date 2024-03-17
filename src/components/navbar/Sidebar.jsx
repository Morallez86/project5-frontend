// Sidebar.jsx
import React from 'react';
import { IoMenu } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ toggleSidebar, isSidebarVisible }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    toggleSidebar(); // Close the sidebar when a navigation item is clicked
  };

  return (
    <div className={`flex flex-col h-full bg-teal-950 text-white p-4 ${isSidebarVisible ? '' : 'hidden'}`}>
      <div className='flex items-center mb-6'>
        <IoMenu size={40} className='text-3xl mx-auto cursor-pointer' onClick={toggleSidebar} />
      </div>
      <ul>
        <li className='p-2 text-center'>
          <button className="focus:outline-none" onClick={() => handleNavigation('/Home')}>
            Home
          </button>
        </li>
        <li className='p-2 text-center'>
          <button className="focus:outline-none" onClick={() => handleNavigation('/AddTask')}>
            Add Task
          </button>
        </li>
        <li className='p-2 text-center'>
          <button className="focus:outline-none" onClick={() => handleNavigation('/AddUser')}>
            Add User
          </button>
        </li>
        <li className='p-2 text-center'>
          <button className="focus:outline-none cursor-default">
            Management
          </button>
        </li>
        <li className='p-2 text-center'>
          <button className="focus:outline-none" onClick={() => handleNavigation('/ManagingTasks')}>
            Tasks
          </button>
        </li>
        <li className='p-2 text-center'>
          <button className="focus:outline-none" onClick={() => handleNavigation('/ManagingUsers')}>
            Users
          </button>
        </li>
        <li className='p-2 text-center'>
          <button className="focus:outline-none" onClick={() => handleNavigation('/ManagingCategories')}>
            Categories
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
