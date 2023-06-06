import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CustomCalendar = ({ value, onChange }) => {
  const [selectedRange, setSelectedRange] = useState(value);

  const handleDateChange = (date) => {
    setSelectedRange(date);
    console.log("Selected Range:", date);
  };

  const handleApply = () => {
    onChange(selectedRange);
  };

  const handleCancel = () => {
    setSelectedRange(value);
    onChange(value);
  };

  return (
    <div>
      <Calendar
        selectRange={true}
        value={selectedRange}
        onChange={handleDateChange}
        formatLongDate={(locale, date) => date.toLocaleDateString()}
      />
      <button onClick={handleApply}>Apply</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default CustomCalendar;
