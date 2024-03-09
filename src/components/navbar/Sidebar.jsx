import React from 'react';
import { IoMenu } from 'react-icons/io5';

const Sidebar = () => {
  return (
    <div className='flex flex-col h-full bg-gray-800 text-[#00df9a] p-4'>
      <div className='flex items-center mb-6'>
        <IoMenu size={40} className='text-3xl mx-auto' />
      </div>
      <ul>
        <li className='p-2 text-center'>Add Task</li>
        <li className='p-2 text-center'>Add User</li>
        <li className='p-2 text-center'>Management</li>
        <li className='p-2 text-center'>Tasks</li>
        <li className='p-2 text-center'>Users</li>
      </ul>
    </div>
  );
};

export default Sidebar;
