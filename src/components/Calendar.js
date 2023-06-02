import { useState } from "react";
import { Calendar } from "primereact/calendar";
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";

const CustomCalendar = () => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleDateChange = (e) => {
    setDateRange(e.value);
  };

  return (
    <Calendar
      value={dateRange}
      onChange={handleDateChange}
      selectionMode="range"
      dateFormat="dd/mm/yy"
      showButtonBar
      readOnlyInput
    />
  );
};

export default CustomCalendar;
