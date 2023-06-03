import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../img/showpos.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
// import { DateRangePicker } from "react-date-range";

import CalendarSort from "./CalendarSort";

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

  const handleDateChange = (e) => {
    setDateRange({
      startDate: e.value[0],
      endDate: e.value[1],
    });
  };

  const handleSortClick = async () => {
    try {
      const startDate = dateRange.startDate.toISOString().split("T")[0];
      const endDate = dateRange.endDate.toISOString().split("T")[0];
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
        <CalendarSort
          value={dateRange}
          onChange={handleDateChange}
          selectionMode="range"
          // readOnlyInput
        />

        <button onClick={handleSortClick}>
          <FontAwesomeIcon icon="arrow-right-to-bracket" />
        </button>
      </div>
    </div>
  );
};

export default Header;
