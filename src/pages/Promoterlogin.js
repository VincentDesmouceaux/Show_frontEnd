import React, { useState, useEffect } from "react";
import axios from "axios";

const PromoterLogin = (token) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Effectuez ici l'appel API pour récupérer les informations de l'utilisateur connecté
        // Utilisez le token d'authentification ou toute autre méthode d'identification appropriée
        const response = await axios.get(
          "http://localhost:3000/promoter/user",
          {
            // Ajoutez les en-têtes d'authentification appropriés, par exemple :
            headers: {
              Authorization: `Bearer ${token}`, // Remplacez "token" par votre variable de token
            },
          }
        );

        // Mettez à jour l'état avec les données de l'utilisateur
        setUserData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        // Gérez les erreurs ici
        // Par exemple, affichez un message d'erreur à l'utilisateur
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []); // Assurez-vous de passer les dépendances appropriées si nécessaire

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : userData ? (
        <div>
          <img src={userData.photo} alt="User" />
          <h1>{userData.name}</h1>
          {/* Affichez d'autres éléments d'information de l'utilisateur ici */}
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default PromoterLogin;
