import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CustomCalendar = ({ value, onChange }) => {
  const handleDateChange = (date) => {
    onChange(date);
  };

  return (
    <Calendar
      value={value}
      onChange={handleDateChange}
      selectRange={true}
      formatLongDate={(locale, date) => date.toLocaleDateString()}
    />
  );
};

export default CustomCalendar;
