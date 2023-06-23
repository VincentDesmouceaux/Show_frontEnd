import { useState, useRef, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import logo from "../img/showpos.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CustomCalendar from "./CustomCalendar";

import Autocomplete from "./Autocomplete";

const Header = ({
  search,
  setSearch,
  token,
  handleToken,
  data,
  setDateRange,
  dateRange,
  autocompleteRef,
}) => {
  const calendarRef = useRef(null);
  const navigate = useNavigate();
  const [showCalendar, setShowCalendar] = useState(false);
  const [hasSelectedDates, setHasSelectedDates] = useState(false);
  const [selectedDateString, setSelectedDateString] = useState("");

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

    setHasSelectedDates(true);
    const startDateString = e[0] ? e[0].toLocaleDateString() : "";
    const endDateString = e[1] ? e[1].toLocaleDateString() : "";
    setSelectedDateString(`${startDateString} - ${endDateString}`);
  };

  const handleCalendarClick = (event) => {
    event.preventDefault();
    setShowCalendar(!showCalendar);
    if (!hasSelectedDates) {
      setSearch("...");
    }
  };

  const handleCancel = () => {
    setDateRange({
      startDate: null,
      endDate: null,
    });
    handleClearSelection();
    setSearch("");
    setHasSelectedDates(false);
    setShowCalendar(false);
  };

  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      if (showCalendar && !hasSelectedDates) {
        handleHideCalendar();
      }
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const startDateString = dateRange.startDate
    ? dateRange.startDate.toLocaleDateString()
    : "";
  const endDateString = dateRange.endDate
    ? dateRange.endDate.toLocaleDateString()
    : "";

  const placeholder =
    (!showCalendar && !hasSelectedDates) ||
    (!showCalendar && !dateRange.startDate && !dateRange.endDate)
      ? "Search by dates"
      : "...";

  const handleClearSelection = () => {
    setDateRange({
      startDate: null,
      endDate: null,
    });
    setHasSelectedDates(false);
    setSearch("");
    setSelectedDateString("");
  };

  const handleHideCalendar = () => {
    setShowCalendar(false);
  };
  const handleLogoClick = () => {
    setSearch("");
    if (autocompleteRef.current) {
      autocompleteRef.current.setState({ userInput: "" });
    }
    navigate("/");
  };
  return (
    <div className="header-container">
      <div className="header-upper">
        <div className="logo-container">
          <div className="center-logo">
            <Link to="/" onClick={handleLogoClick}>
              <img className="header-logo" src={logo} alt="show" />
            </Link>
          </div>
        </div>
        <div className="header-icons-container">
          <div className="header-icons">
            <FontAwesomeIcon icon="fa-solid fa-user-gear" />
            <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
            <FontAwesomeIcon icon="fa-solid fa-user-large" />
          </div>
        </div>
      </div>

      <div className="search-container">
        <Autocomplete
          ref={autocompleteRef}
          items={data}
          value={search}
          onChange={handleSearchChange}
          onSelect={handleSearchSelect}
        />
      </div>

      <div className="date-range-container" ref={calendarRef}>
        <FontAwesomeIcon
          icon="fa-solid fa-magnifying-glass"
          className="fa-magnifying-glass"
        />
        <input
          className="search-by-dates"
          type="text"
          placeholder={placeholder}
          value={
            hasSelectedDates
              ? `${startDateString} - ${endDateString}`
              : selectedDateString || ""
          }
          onClick={handleCalendarClick}
          readOnly
        />
        {showCalendar && (
          <CustomCalendar
            value={[dateRange.startDate, dateRange.endDate]}
            onChange={handleDateChange}
            setSelectedDateString={setSelectedDateString}
            onClearSelection={handleCancel}
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
