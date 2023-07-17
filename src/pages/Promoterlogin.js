import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const PromoterLogin = ({ token }) => {
  console.log(token);
  const [userData, setUserData] = useState(null);
  const [eventData, setEventData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
                <h3>{event.name}</h3>
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
