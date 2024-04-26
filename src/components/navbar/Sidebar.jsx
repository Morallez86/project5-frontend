import React from 'react';
import { IoMenu } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { userStore } from "../../stores/UserStore";
import { FormattedMessage } from 'react-intl';
import { GrHome } from "react-icons/gr";
import languages from '../../translations';
import { IntlProvider } from 'react-intl';

const Sidebar = ({ toggleSidebar, isSidebarVisible }) => {
  const navigate = useNavigate();
  const role = userStore((state) => state.role);
  const locale = userStore((state) => state.locale);

  const handleNavigation = (path) => {
    navigate(path);
    toggleSidebar(); // Close the sidebar when a navigation item is clicked
  };

  return (
    <IntlProvider locale={locale} messages={languages[locale]}>
    <div className={`flex border-r-2 border-b-2 rounded flex-col h-full bg-teal-950 text-white p-4 ${isSidebarVisible ? '' : 'hidden'}`}>
      <div className='flex items-center mb-6'>
        <IoMenu size={40} className='text-3xl mx-auto cursor-pointer' onClick={toggleSidebar} />
      </div>
      <ul>
        <li className='p-2 text-center'>
          <button className="focus:outline-none mb-4" onClick={() => handleNavigation('/Home')}>
            <GrHome className='w-6 h-6' />
          </button>
        </li>
        <li className='p-2 text-center'>
          <button className="focus:outline-none" onClick={() => handleNavigation('/Notifications')}>
            <FormattedMessage id="notifications" defaultMessage="Notifications" />
          </button>
        </li>
        <li className='p-2 text-center'>
          <button className="focus:outline-none" onClick={() => handleNavigation('/AddTask')}>
            <FormattedMessage id="addTask" defaultMessage="Add Task" />
          </button>
        </li>
        {role === "po" && (
          <li className='p-2 text-center'>
            <button className="focus:outline-none" onClick={() => handleNavigation('/AddUser')}>
              <FormattedMessage id="addUser" defaultMessage="Add User" />
            </button>
          </li>
        )}
        {(role === "po" || role === "sm") && (
          <li className='p-2 text-center'>
            <button className="focus:outline-none cursor-default my-4 text-base font-bold">
              <FormattedMessage id="management" defaultMessage="Management" />
            </button>
          </li>
        )}
        {(role === "po" || role === "sm") && (
          <li className='p-2 text-center'>
            <button className="focus:outline-none" onClick={() => handleNavigation('/ManagingTasks')}>
              <FormattedMessage id="tasks" defaultMessage="Tasks" />
            </button>
          </li>
        )}
        {(role === "po" || role === "sm") && (
          <li className='p-2 text-center'>
            <button className="focus:outline-none" onClick={() => handleNavigation('/ManagingUsers')}>
              <FormattedMessage id="users" defaultMessage="Users" />
            </button>
          </li>
        )}
        {(role === "po") && (
          <li className='p-2 text-center'>
            <button className="focus:outline-none" onClick={() => handleNavigation('/ManagingCategories')}>
              <FormattedMessage id="categories" defaultMessage="Categories" />
            </button>
          </li>
        )}
        {(role === "po") && (
          <li className='p-2 text-center'>
            <button className="focus:outline-none" onClick={() => handleNavigation('/Dashboard')}>
              <FormattedMessage id="dashboard" defaultMessage="Dashboard" />
            </button>
          </li>
        )}
      </ul>
    </div>
    </IntlProvider>
  );
};

export default Sidebar;
