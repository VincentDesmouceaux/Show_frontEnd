import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../img/showpos.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

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

  const calendarRef = useRef(null);
  const [showCalendar, setShowCalendar] = useState(false);

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
    setShowCalendar(false);
  };
  const handleCalendarClick = () => {
    setShowCalendar(!showCalendar);
  };

  const handleCancel = () => {
    setDateRange({
      startDate: null,
      endDate: null,
    });
    setSearch("");
  };

  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const placeholder = showCalendar ? "..." : "Search by dates";

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

      <div className="date-range-container" ref={calendarRef}>
        <input
          type="text"
          placeholder={placeholder}
          value={
            dateRange.startDate && dateRange.endDate
              ? `${dateRange.startDate.toLocaleDateString()} - ${dateRange.endDate.toLocaleDateString()}`
              : ""
          }
          onClick={handleCalendarClick}
          readOnly
        />
        {showCalendar && (
          <CustomCalendar
            value={[dateRange.startDate, dateRange.endDate]}
            onChange={handleDateChange}
          />
        )}
      </div>
      {dateRange.startDate && dateRange.endDate && (
        <button onClick={handleCancel}>Cancel</button>
      )}
    </div>
  );
};

export default Header;
