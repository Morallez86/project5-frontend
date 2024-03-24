import React from 'react';
import { MdPriorityHigh } from "react-icons/md";
import { IoStarSharp } from "react-icons/io5"; // Import star icon
import { taskStore } from "../../stores/TaskStore";
import { userStore } from "../../stores/UserStore"; // Import userStore
import { useNavigate } from 'react-router-dom';

function TaskComponent({ id, title, priority, owner }) {
  const { updateTaskId, updateTaskOwner } = taskStore(); // Use both update functions
  const navigate = useNavigate(); // Get the navigate function
  const { username } = userStore(); // Get username from userStore

  let bgColor;
  switch (priority) {
    case 100:
      bgColor = "bg-green-500";
      break;
    case 200:
      bgColor = "bg-yellow-500";
      break;
    case 300:
      bgColor = "bg-red-500";
      break;
    default:
      bgColor = "bg-gray-200";
      break;
  }

  // Function to handle task click
  const handleClick = () => {
    // Store the task ID and owner using Zustand
    updateTaskId(id);
    updateTaskOwner(owner);
    // Navigate to the EditTask component
    navigate('/EditTask');
  };

  // Check if the task owner matches the logged-in user
  const isCurrentUserOwner = owner === username;

  return (
    <div className="bg-slate-300 border border-emerald-900  rounded-md p-4 mb-4 text-black cursor-pointer relative" onClick={handleClick}>
      <div className="flex items-center">
        <div>
          <MdPriorityHigh className={`text-2xl mr-2 rounded-full border border-black ${bgColor}`} />
        </div>
        <div style={{ maxWidth: 'calc(100% - 40px)' }}>
          <p className="text-lg font-bold overflow-hidden whitespace-nowrap overflow-ellipsis">{title}</p>
        </div>
        {isCurrentUserOwner && (
          <div className="absolute top-2 right-2">
            <IoStarSharp className="text-emerald-900" />
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskComponent;
