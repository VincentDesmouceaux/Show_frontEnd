import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const PromoterLogin = ({ token }) => {
  console.log(token);
  const [userData, setUserData] = useState(null);
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
      ) : userData ? (
        <div>
          <img src={userData.account.avatar.secure_url} alt="User" />
          <h1>{userData.account.username}</h1>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default PromoterLogin;
