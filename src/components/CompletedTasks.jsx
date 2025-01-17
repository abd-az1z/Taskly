import React from "react";

const CompletedTasks = ({ tasks, isVisible }) => {
  return (
    <div
      className={`overflow-hidden transition-all duration-1000 ease-in-out ${
        isVisible ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
      } bg-white p-3 rounded-lg shadow-xl`}
    >
      <ul className="list-disc italic  text-green-500  text-sm ml-4">
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <li key={index}>
              <span className="font-medium line-through">{task.task}</span>
            </li>
          ))
        ) : (
          <p className="text-gray-500 italic">No completed tasks found.</p>
        )}
      </ul>
    </div>
  );
};

export default CompletedTasks;