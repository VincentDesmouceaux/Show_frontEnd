import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PromoterLogin = ({ token, handleToken }) => {
  const [userData, setUserData] = useState(null);
  const [eventData, setEventData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredTrash, setIsHoveredTrash] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(!token);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
      setIsLoading(false);
      console.log(error.message);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchPromoterProfile();
    } else {
      setIsLoading(false);
    }
  }, [token, fetchPromoterProfile]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate("/");
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

      navigate("/promoter/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
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
      {!isLoading && token && userData ? (
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
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ marginRight: "10px", position: "relative" }}>
                      <FontAwesomeIcon
                        icon="fa-solid fa-pen-to-square"
                        style={{
                          marginTop: "10px",

                          color: isHovered === event._id ? "red" : "",
                          cursor: "pointer",
                        }}
                        onMouseEnter={() => {
                          setIsHovered(event._id);
                        }}
                        onMouseLeave={() => {
                          setIsHovered(null);
                        }}
                        onClick={() =>
                          navigate(`/promoter/event/modify/${event._id}`)
                        }
                      />
                      {isHovered === event._id && (
                        <div
                          className="tooltip"
                          style={{
                            position: "absolute",
                            left: "100%",
                            top: "50%",
                            transform: "translateY(-50%)",
                            backgroundColor: "rgba(0, 0, 0, 0.8)",
                            color: "#fff",
                            padding: "6px 10px",
                            borderRadius: "4px",
                          }}
                        >
                          <span>Modifier l'événement ?</span>
                        </div>
                      )}
                    </div>
                    <div style={{ position: "relative" }}>
                      <FontAwesomeIcon
                        icon="fa-solid fa-trash"
                        style={{
                          marginTop: "9px",
                          color: isHoveredTrash === event._id ? "red" : "",
                          cursor: "pointer",
                        }}
                        onMouseEnter={() => setIsHoveredTrash(event._id)}
                        onMouseLeave={() => setIsHoveredTrash(null)}
                      />
                      {isHoveredTrash === event._id && (
                        <div
                          className="tooltip"
                          style={{
                            position: "absolute",
                            left: "100%",
                            top: "50%",
                            transform: "translateY(-50%)",
                            backgroundColor: "rgba(0, 0, 0, 0.8)",
                            color: "#fff",
                            padding: "6px 10px",
                            borderRadius: "4px",
                          }}
                        >
                          <span>Supprimer l'événement ?</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No events available.</p>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PromoterLogin;
