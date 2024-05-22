import { useState, useRef, useEffect } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
import logo from "../img/showpos.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CustomCalendar from "./CustomCalendar";

import Autocomplete from "./Autocomplete";

const Header = ({
  search,
  setSearch,
  token,
  setToken,
  handleToken,
  data,
  setDateRange,
  dateRange,
  autocompleteRef,
  isLoggedIn,
  setIsLoggedIn,
}) => {
  const calendarRef = useRef(null);
  const navigate = useNavigate();
  const [showCalendar, setShowCalendar] = useState(false);
  const [hasSelectedDates, setHasSelectedDates] = useState(false);
  const [selectedDateString, setSelectedDateString] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConnectedModal, setIsConnectedModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
  const handleHideCalendar = () => {
    setShowCalendar(false);
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
  });

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

  const handleLogoClick = () => {
    setSearch("");
    if (autocompleteRef.current) {
      autocompleteRef.current.setState({ userInput: "" });
    }
    navigate("/");
  };

  // MODAL

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://site--show-backend--5rcbdjs6tgqv.code.run/promoter/login",
        {
          email,
          password,
        }
      );

      handleToken(response.data.token);
      setIsLoggedIn(true);
      setToken(response.data.token);

      console.log("Utilisateur connecté :", response.data.token);

      handleModalClose();
      navigate("/promoter/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleModalOpen = () => {
    if (isLoggedIn) {
      setIsConnectedModal(true);
    } else {
      setIsModalOpen(true);
    }
    setEmail("");
    setPassword("");
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsConnectedModal(false);
    setEmail("");
    setPassword("");
  };

  const handleClickOutsideModal = (event) => {
    if (event.target.classList.contains("modal-overlay")) {
      handleModalClose();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideModal);

    return () => {
      document.removeEventListener("click", handleClickOutsideModal);
    };
  });
  const handleLogout = () => {
    setIsLoggedIn(false);
    handleToken("");
    navigate("/");
    handleModalClose();
  };

  const handleProfile = () => {
    handleModalClose();
    navigate("/promoter/login");
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
            <FontAwesomeIcon
              icon="fa-solid fa-user-gear"
              onClick={handleModalOpen}
              className={isLoggedIn ? "connected" : ""}
            />
            <FontAwesomeIcon
              icon="fa-solid fa-cart-shopping"
              className="custom-icon"
            />
            <FontAwesomeIcon icon="fa-solid fa-user" className="custom-icon" />
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
      {isConnectedModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">User Options</h2>
            <button
              className="btn-login"
              onClick={handleLogout}
              style={{ marginRight: "10px" }}
            >
              Logout
            </button>
            <button className="btn-login" onClick={handleProfile}>
              My Profile
            </button>
          </div>
        </div>
      )}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">Promoter login</h2>
            <button className="modal-close" onClick={handleModalClose}>
              X
            </button>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn-login">
                Se connecter
              </button>
            </form>
            <p className="submodal">
              Si vous voulez créer un événement et que vous n'avez pas encore de
              compte,{" "}
              <Link to="/promoter/signup" onClick={handleModalClose}>
                inscrivez-vous ici
              </Link>
              .
            </p>
          </div>
        </div>
      )}

      {dateRange.startDate && dateRange.endDate && (
        <button onClick={handleCancel}>Cancel</button>
      )}
    </div>
  );
};

export default Header;
