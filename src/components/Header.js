import { Link } from "react-router-dom";
import logo from "../img/showpos.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import DateRange from "./DateRange";

const Header = ({ search, setSearch, token, handleToken }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div
        onClick={() => {
          navigate("/");
        }}
      >
        <img className="header-logo" src={logo} alt="show" />

        <div className="search-container">
          <input
            value={search}
            type="text"
            className="search-input"
            placeholder="Recherche des articles"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
