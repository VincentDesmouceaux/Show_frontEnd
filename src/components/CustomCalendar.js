import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CustomCalendar = ({
  value,
  onChange,
  setSelectedDateString,
  onClearSelection,
}) => {
  const [selectedRange, setSelectedRange] = useState(value);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedRange(date);
    setSelectedDate(date[0]);

    console.log("Selected Range:", date[0], "-", date[1]);
  };

  const handleDayClick = (date) => {
    if (!selectedDate) {
      setSelectedDate(date);
      const startDateString = date.toLocaleDateString();
      setSelectedDateString(startDateString);
    } else {
      const startDateString = selectedDate.toLocaleDateString();
      const endDateString = date.toLocaleDateString();
      const selectedDateString = `${startDateString} - ${endDateString}`;
      setSelectedDateString(selectedDateString);
      setSelectedRange([selectedDate, date]);
      onChange([selectedDate, date]);
    }
  };

  const handleClearSelection = () => {
    setSelectedRange([]);
    setSelectedDate(null);
    setSelectedDateString("");
  };

  const handleCancel = () => {
    onClearSelection();
    handleClearSelection();
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
        onClickDay={handleDayClick}
      />

      {selectedRange.length > 0 && (
        <button onClick={handleCancel}>Cancel2</button>
      )}
    </div>
  );
};

export default CustomCalendar;
