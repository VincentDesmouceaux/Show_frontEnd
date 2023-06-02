import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../img/showpos.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
// import { DateRangePicker } from "react-date-range";

import Calendar from "./Calendar";

import Autocomplete from "./Autocomplete";

const Header = ({
  search,
  setSearch,
  token,
  handleToken,
  data,
  setFilteredEvents,
}) => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
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

  const handleDateChange = (ranges) => {
    setDateRange(ranges.selection);
  };

  const handleSortClick = async () => {
    try {
      const startDate = dateRange.startDate.toISOString();
      const endDate = dateRange.endDate.toISOString();
      const response = await axios.get("http://localhost:3000/events", {
        params: { startDate, endDate },
      });
      setFilteredEvents(response.data);
    } catch (error) {
      console.log(error.message);
    }
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
        <Calendar
          value={dateRange}
          onChange={handleDateChange}
          selectionMode="range"
          readOnlyInput
        />

        <button onClick={handleSortClick}>
          <FontAwesomeIcon icon="arrow-right-to-bracket" />
        </button>
      </div>
    </div>
  );
};

export default Header;
