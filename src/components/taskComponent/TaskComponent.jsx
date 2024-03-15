import React from 'react';
import { MdPriorityHigh } from "react-icons/md";

function TaskComponent({ title, priority }) {
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

  return (
    <div className="bg-gray-200 rounded-md p-4 mb-4 text-black">
      <div className="flex items-center">
        <MdPriorityHigh className={`text-2xl mr-2 rounded-full ${bgColor}`} />
        <p className="text-lg font-bold">{title}</p>
      </div>
    </div>
  );
}

export default TaskComponent;
