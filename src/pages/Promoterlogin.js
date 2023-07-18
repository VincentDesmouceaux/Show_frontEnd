import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PromoterLogin = ({ token, handleToken }) => {
  const [userData, setUserData] = useState(null);
  const [eventData, setEventData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(!token); // Show the modal if no token is present
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fetchPromoterProfile = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/promoter/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const eventsResponse = await axios.get(
        "http://localhost:3000/promoter/events",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEventData(eventsResponse.data);
      setIsLoading(false);
      setUserData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchPromoterProfile();
    }
  }, [token, fetchPromoterProfile]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/promoter/login",
        {
          email,
          password,
        }
      );

      console.log("Utilisateur connecté :", response.data.token);
      handleModalClose();
      handleToken(response.data.token);
      fetchPromoterProfile(); // Fetch promoter profile after successful login
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div style={{ textAlign: "center" }}>
            <h1 className="title">{userData?.account?.username}</h1>
            <div className="avatar-container">
              <img src={userData?.account?.avatar?.secure_url} alt="User" />
            </div>
          </div>
          <div className="left-align">
            <h2 className="title">My Events:</h2>
            {eventData.length > 0 ? (
              eventData.map((event) => (
                <div key={event._id} className="event-container-profile">
                  <h3 style={{ marginBottom: "10px" }}>{event.name}</h3>
                  <div className="event-image-container-profile">
                    <img
                      src={event.image.secure_url}
                      alt="Event"
                      className="event-image-profile"
                    />
                  </div>
                  <p className="event-date-profile">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  <FontAwesomeIcon
                    icon="fa-solid fa-pen-to-square"
                    style={{
                      marginTop: "10px",
                      color: isHovered ? "red" : "",
                      cursor: "pointer",
                    }}
                    onMouseEnter={() => {
                      setIsHovered(true);
                      setShowTooltip(true);
                    }}
                    onMouseLeave={() => {
                      setIsHovered(false);
                      setShowTooltip(false);
                    }}
                  />
                  {showTooltip && (
                    <div className="tooltip">
                      <span>Modifier l'événement ?</span>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No events available.</p>
            )}
          </div>
        </div>
      )}
      {!token && isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">Promoter Login</h2>
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
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn-login">
                Log In
              </button>
            </form>
            <p className="submodal">
              Don't have an account?{" "}
              <a href="/promoter/signup" onClick={handleModalClose}>
                Sign Up
              </a>
              .
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromoterLogin;
