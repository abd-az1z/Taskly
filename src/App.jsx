import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Calender from "./components/Calender";
import DateDetails from "./components/DateDetails";
import { TasksProvider } from "./context/TasksContext";

const App = () => {
  const [showCalendar, setShowCalendar] = useState(false); // Show/Hide calendar
  const [selectedDate, setSelectedDate] = useState(null); // Track selected date

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
    setSelectedDate(null); // Reset the selected date when toggling the calendar
  };

  const handleDateClick = (dateKey) => {
    setSelectedDate(dateKey); // Set the selected date
  };

  return (
    <TasksProvider>
      <Router>
        <div className="w-[100vw] h-[100vh]">
          <div className="w-full pt-8 flex p-5 ">
            {/* Sidebar */}
            <Sidebar onToggleCalendar={toggleCalendar} />

            {/* Main Content */}
            {/* Calendar */}
            {showCalendar && <Calender onDateClick={handleDateClick} />}

            {/* Date Details */}
            {selectedDate && <DateDetails dateKey={selectedDate} />}
          </div>
        </div>
      </Router>
    </TasksProvider>
  );
};

export default App;
