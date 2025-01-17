import React from "react";

const UpcomingTasks = ({ tasks, isVisible }) => {
  return (
    <div
      className={`overflow-hidden transition-all duration-1000 ease-in-out ${
        isVisible ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
      } bg-white p-3 rounded-lg mb-2 shadow-xl`}
    >
      <ul className="list-disc text-yellow-500 italic capitalize text-sm ml-4">
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <li key={index}>
              <span className="font-medium ">{task.task}</span> - Due in{" "}
              <span className="text-blue-600">{task.dueInDays} days</span>
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-sm italic">No upcoming tasks found.</p>
        )}
      </ul>
    </div>
  );
};

export default UpcomingTasks;