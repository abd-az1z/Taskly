import React, { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
} from "date-fns";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useTasks } from "../context/TasksContext";

const Calender = ({ onDateClick }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { tasks } = useTasks();

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const generateDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const weekStart = startOfWeek(monthStart);
    const weekEnd = endOfWeek(monthEnd);

    const days = [];
    let day = weekStart;

    while (day <= weekEnd) {
      days.push(day);
      day = addDays(day, 1);
    }

    return days;
  };

  // Check if a date has incomplete tasks
  const hasIncompleteTasks = (date) => {
    const dateKey = format(date, "MM-dd-yyyy");
    return tasks[dateKey]?.some((task) => !task.completed);
  };

  return (
    <div className="w-1/2 h-[90vh] bg-slate-300 ml-5 rounded-2xl bg-opacity-70 p-4">
      <h1 className="text-2xl font-bold tracking-wide text-center mb-4">
        Calendar
      </h1>
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="text-lg font-bold">
          <FaArrowLeft />
        </button>
        <h2 className="text-lg font-bold">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <button onClick={nextMonth} className="text-lg font-bold">
          <FaArrowRight />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-sm font-semibold">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-gray-700 py-3">
            {day}
          </div>
        ))}
        {generateDays().map((day) => (
          <div
            key={day}
            className={`px-2 py-4 hover:cursor-pointer rounded-lg ${
              hasIncompleteTasks(day) ? "bg-green-200" : "bg-gray-100"
            }`}
            onClick={() => onDateClick(format(day, "MM-dd-yyyy"))}
          >
            {format(day, "d")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calender;