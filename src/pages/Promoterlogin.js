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
          <div>
            <img src={userData.account.avatar.secure_url} alt="User" />
            <h1>{userData.account.username}</h1>
          </div>
          <div>
            <h2>Events</h2>
            {eventData.map((event) => (
              <div key={event._id}>
                <img src={event.image.secure_url} alt="Event" />
                <h3>{event.name}</h3>
                <p>{event.date}</p>
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
