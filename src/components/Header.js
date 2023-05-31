import { Link } from "react-router-dom";
import logo from "../img/showpos.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import DateRange from "./DateRange";
import Autocomplete from "./Autocomplete";

const Header = ({ search, setSearch, token, handleToken, data }) => {
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
  return (
    <div>
      <div
        onClick={() => {
          navigate("/");
        }}
      >
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
    </div>
  );
};

export default Header;
