import React from 'react';
import { IoMenu } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className='flex flex-col h-full bg-gray-800 text-[#00df9a] p-4'>
      <div className='flex items-center mb-6'>
        <IoMenu size={40} className='text-3xl mx-auto' />
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
          <button className="focus:outline-none" onClick={() => handleNavigation('/Management')}>
            Management
          </button>
        </li>
        <li className='p-2 text-center'>
          <button className="focus:outline-none" onClick={() => handleNavigation('/Tasks')}>
            Tasks
          </button>
        </li>
        <li className='p-2 text-center'>
          <button className="focus:outline-none" onClick={() => handleNavigation('/Users')}>
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
