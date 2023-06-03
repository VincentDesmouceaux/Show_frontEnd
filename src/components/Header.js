import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../img/showpos.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
// import { DateRangePicker } from "react-date-range";

// import CalendarSort from "./CalendarSort";
import CustomCalendar from "./CustomCalendar";

import Autocomplete from "./Autocomplete";

const Header = ({
  search,
  setSearch,
  token,
  handleToken,
  data,
  setFilteredEvents,
  setDateRange,
  dateRange,
}) => {
  const navigate = useNavigate();

  const handleSearchChange = (text) => {
    setSearch(text);
  };

  const handleSearchSelect = (selectedItem) => {
    if (selectedItem) {
      const value = selectedItem.name;
      setSearch(value);
    } else {
      setSearch("");
    }
  };

  const handleDateChange = (e) => {
    setDateRange({
      startDate: e[0],
      endDate: e[1],
    });
  };

  return (
    <div>
      <div onClick={() => navigate("/")}>
        <img className="header-logo" src={logo} alt="show" />
      </div>

      <div className="search-container">
        <Autocomplete
          items={data}
          value={search}
          onChange={handleSearchChange}
          onSelect={handleSearchSelect}
        />
      </div>

      <div className="date-range-container">
        <CustomCalendar
          value={[dateRange.startDate, dateRange.endDate]}
          onChange={handleDateChange}
        />
      </div>
    </div>
  );
};

export default Header;
