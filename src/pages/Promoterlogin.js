import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PromoterLogin = ({ token }) => {
  console.log(token);
  const [userData, setUserData] = useState(null);
  const [eventData, setEventData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

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
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchPromoterProfile();
    }
  }, [token, fetchPromoterProfile]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : userData && eventData.length > 0 ? (
        <div>
          <div style={{ textAlign: "center" }}>
            <h1 className="title">{userData.account.username}</h1>
            <div className="avatar-container">
              <img src={userData.account.avatar.secure_url} alt="User" />
            </div>
          </div>
          <div className="left-align">
            <h2 className="title"> My Events :</h2>
            {eventData.map((event) => (
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
                  {" "}
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
                    <span>Modifier l'event ?</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default PromoterLogin;
