import React, { useState, useEffect } from "react";
import { MdOutlineInventory } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { useTasks } from "../context/TasksContext";
import { parse, differenceInDays, addDays } from "date-fns";
import UpcomingTasks from "./UpcomingTasks";
import CompletedTasks from "./CompletedTasks";

const Sidebar = ({ onToggleCalendar }) => {
  const { tasks, updateTask } = useTasks(); // Access tasks and updateTask from context
  const [openUpcomingTasks, setOpenUpcomingTasks] = useState(false);
  const [openCompletedTasks, setOpenCompletedTasks] = useState(false);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleToggleUpcomingTasks = () => setOpenUpcomingTasks((prev) => !prev);
  const handleToggleCompletedTasks = () =>
    setOpenCompletedTasks((prev) => !prev);

  useEffect(() => {
    if (tasks) {
      const today = new Date();
      const nextWeek = addDays(today, 7);

      // Filter upcoming tasks
      const filteredUpcomingTasks = Object.keys(tasks)
        .flatMap((dateKey) =>
          tasks[dateKey].map((task) => ({
            ...task,
            dueInDays: differenceInDays(
              parse(dateKey, "MM-dd-yyyy", new Date()),
              today
            ),
            dueDate: dateKey, // Include dateKey for reference
          }))
        )
        .filter(
          (task) =>
            !task.completed && task.dueInDays >= 0 && task.dueInDays <= 7
        )
        .sort((a, b) => a.dueInDays - b.dueInDays);

      // Filter completed tasks
      const filteredCompletedTasks = Object.keys(tasks)
        .flatMap((dateKey) =>
          tasks[dateKey].map((task) => ({
            ...task,
            dueDate: dateKey,
          }))
        )
        .filter((task) => task.completed);

      setUpcomingTasks(filteredUpcomingTasks);
      setCompletedTasks(filteredCompletedTasks);
    }
  }, [tasks]);

  const handleMarkComplete = (taskId, dueDate) => {
    updateTask(taskId, { completed: true });
  };

  return (
    <div className="w-1/4">
      <div className="bg-slate-200 p-4 h-[90vh] rounded-2xl">
        <div className="pb-4 border-b border-gray-700 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-wide italic">Taskly</h1>
          <MdOutlineInventory size={24} />
        </div>

        {/* Toggle Calendar Button */}
        <div className="relative my-5 group">
          <button
            onClick={onToggleCalendar}
            className="w-full  text-lg font-semibold text-start"
          >
            Calendar
          </button>
          <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gray-500 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-in-out"></div>
        </div>

        {/* Upcoming Tasks */}
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Upcoming Tasks</h2>
            <button
              onClick={handleToggleUpcomingTasks}
              className="flex items-center"
            >
              <IoIosArrowDown
                className={`${
                  openUpcomingTasks ? "rotate-180" : ""
                } transition-transform`}
              />
            </button>
          </div>
          {/* Pass tasks and mark complete function */}
          <UpcomingTasks
            tasks={upcomingTasks}
            isVisible={openUpcomingTasks}
            onMarkComplete={handleMarkComplete}
          />
        </div>

        {/* Completed Tasks */}
        <div>
          <div className="flex  items-center justify-between">
            <h2 className="text-lg font-semibold">Completed Tasks</h2>
            <button
              onClick={handleToggleCompletedTasks}
              className="flex items-center"
            >
              <IoIosArrowDown
                className={`${
                  openCompletedTasks ? "rotate-180" : ""
                } transition-transform`}
              />
            </button>
          </div>
          <CompletedTasks
            tasks={completedTasks}
            isVisible={openCompletedTasks}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
