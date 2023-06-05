import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CustomCalendar = ({ value, onChange }) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateChange = (date) => {
    onChange(date);
  };

  const handleInputFocus = () => {
    setShowCalendar(true);
  };

  const handleInputBlur = () => {
    setShowCalendar(false);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search date"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      {showCalendar && (
        <Calendar
          value={value}
          onChange={handleDateChange}
          selectRange={true}
          formatLongDate={(locale, date) => date.toLocaleDateString()}
        />
      )}
    </div>
  );
};

export default CustomCalendar;
