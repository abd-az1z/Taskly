import React, { useState } from "react";
import { useTasks } from "../context/TasksContext";
import { format, parse } from "date-fns";

const DateDetails = ({ dateKey }) => {
  const { tasks, addTask, deleteTask, updateTask } = useTasks();
  const [taskInput, setTaskInput] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskInput, setEditingTaskInput] = useState("");

  const parsedDate = parse(dateKey, "MM-dd-yyyy", new Date());
  const formattedDate = format(parsedDate, "EEEE, MMMM d, yyyy");

  const handleAddTask = () => {
    if (!taskInput.trim()) return;
    addTask(dateKey, taskInput);
    setTaskInput("");
  };

  const handleUpdateTask = (taskId) => {
    if (!editingTaskInput.trim()) return;
    updateTask(taskId, { task: editingTaskInput });
    setEditingTaskId(null);
    setEditingTaskInput("");
  };

  const handleMarkComplete = (taskId, completed) => {
    updateTask(taskId, { completed: !completed });
  };

  return (
    <div className="w-1/4 rounded-2xl ml-5 bg-slate-200 h-[90vh] p-4">
      <div className="border-b pb-2 border-gray-500 ">
        <h1 className="text-xl font-semibold">{formattedDate}</h1>
      </div>
      <div className="overflow-y-scroll  h-72 my-3 ">
        <ul className="my-2 ">
          {(tasks[dateKey] || []).map((task) => (
            <li
              key={task.id}
              className="flex flex-col mb-2 bg-white p-3 rounded-lg"
            >
              {/* Task Title */}
              <div className="flex justify-between mb-2 items-center">
                <span
                  className={`text-lg capitalize ${
                    task.completed ? "line-through text-green-600" : ""
                  }`}
                >
                  {task.task}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 font-semibold text-sm hover:underline"
                >
                  Delete
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between ">
                {editingTaskId === task.id ? (
                  <>
                    <input
                      type="text"
                      value={editingTaskInput}
                      onChange={(e) => setEditingTaskInput(e.target.value)}
                      className="w-full p-1 border rounded-lg mr-2"
                    />
                    <button
                      onClick={() => handleUpdateTask(task.id)}
                      className=" rounded-lg text-sm font-semibold text-yellow-600 hover:text-yellow-400"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setEditingTaskId(task.id);
                        setEditingTaskInput(task.task);
                      }}
                      className="text-sm hover:underline rounded-lg text-yellow-500 "
                    >
                      Update
                    </button>
                    <button
                      onClick={() =>
                        handleMarkComplete(task.id, task.completed)
                      }
                      className={`text-sm rounded-lg ${
                        task.completed
                          ? " opacity-50 text-green-400 hover:underline"
                          : " text-green-600 hover:underline"
                      }`}
                    >
                      {task.completed ? "Completed" : "Mark Complete"}
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
          {!(tasks[dateKey] || []).length && (
            <p className="text-gray-500 italic ">
              No tasks added for this date.
            </p>
          )}
        </ul>
      </div>

      <textarea
        type="text"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        placeholder="Add a task"
        className="w-full h-20 p-2 border rounded-lg mb-1"
      />
      <button
        onClick={handleAddTask}
        className="w-full border bg-gray-500 text-white p-2 rounded-lg hover:bg-green-300 hover:text-gray-700 "
      >
        Add Task
      </button>
    </div>
  );
};

export default DateDetails;
