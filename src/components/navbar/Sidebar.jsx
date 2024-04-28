import React, { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { userStore } from '../../stores/UserStore';
import { FormattedMessage, IntlProvider } from 'react-intl';
import { GrHome } from 'react-icons/gr';
import languages from '../../translations';

const Sidebar = ({ toggleSidebar, isSidebarVisible }) => {
  const navigate = useNavigate();
  const role = userStore((state) => state.role);
  const locale = userStore((state) => state.locale);
  const sidebarRef = useRef(null);

  const handleNavigation = (path) => {
    navigate(path);
    toggleSidebar(); // Close the sidebar when a navigation item is clicked
  };

  const handleClickOutside = useCallback((event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      toggleSidebar(); // Close the sidebar if clicked outside
    }
  }, [toggleSidebar]); // Only re-create the function if toggleSidebar changes

  useEffect(() => {
    const handleClick = (event) => {
      handleClickOutside(event);
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [handleClickOutside]);

  return (
    <IntlProvider locale={locale} messages={languages[locale]}>
      <div
        ref={sidebarRef}
        className={`fixed top-20 left-0 w-40 border-t border-r border-b rounded-tr rounded-br bg-teal-950 text-white p-4 transition-transform duration-300 z-50 ${
          isSidebarVisible ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <ul>
          <li className='p-2 text-center'>
            <button className='focus:outline-none mb-4' onClick={() => handleNavigation('/Home')}>
              <GrHome className='w-6 h-6' />
            </button>
          </li>
          <li className='p-2 text-center'>
            <button className='focus:outline-none' onClick={() => handleNavigation('/Notifications')}>
              <FormattedMessage id='notifications' defaultMessage='Notifications' />
            </button>
          </li>
          {/* Additional navigation items based on user role */}
          {role === 'po' && (
            <li className='p-2 text-center'>
              <button className='focus:outline-none' onClick={() => handleNavigation('/AddUser')}>
                <FormattedMessage id='addUser' defaultMessage='Add User' />
              </button>
            </li>
          )}
          {(role === 'po' || role === 'sm') && (
            <li className='p-2 text-center'>
              <button className='focus:outline-none cursor-default my-4 text-base font-bold'>
                <FormattedMessage id='management' defaultMessage='Management' />
              </button>
            </li>
          )}
          {/* Additional navigation items */}
          {(role === 'po' || role === 'sm') && (
            <li className='p-2 text-center'>
              <button className='focus:outline-none' onClick={() => handleNavigation('/ManagingTasks')}>
                <FormattedMessage id='tasks' defaultMessage='Tasks' />
              </button>
            </li>
          )}
          {/* Additional navigation items */}
          {(role === 'po' || role === 'sm') && (
            <li className='p-2 text-center'>
              <button className='focus:outline-none' onClick={() => handleNavigation('/ManagingUsers')}>
                <FormattedMessage id='users' defaultMessage='Users' />
              </button>
            </li>
          )}
          {/* Additional navigation items */}
          {role === 'po' && (
            <li className='p-2 text-center'>
              <button className='focus:outline-none' onClick={() => handleNavigation('/ManagingCategories')}>
                <FormattedMessage id='categories' defaultMessage='Categories' />
              </button>
            </li>
          )}
          {/* Additional navigation items */}
          {role === 'po' && (
            <li className='p-2 text-center'>
              <button className='focus:outline-none' onClick={() => handleNavigation('/Dashboard')}>
                <FormattedMessage id='dashboard' defaultMessage='Dashboard' />
              </button>
            </li>
          )}
        </ul>
      </div>
    </IntlProvider>
  );
};

export default Sidebar;
