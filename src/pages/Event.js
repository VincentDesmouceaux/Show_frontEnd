import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Audio } from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Event = ({ isLoggedIn }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/events/" + id);

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleReservationClick = () => {
    if (!isLoggedIn) {
      setShowLoginMessage(true);
    } else {
      // Ajoutez ici la logique de réservation
    }
  };

  return isLoading ? (
    <Audio
      height="80"
      width="80"
      radius="9"
      color="skyblue"
      ariaLabel="loading"
    />
  ) : (
    <div className="eventid-container">
      <div className="title-container">
        <p className="event-title">{data.name}</p>
      </div>
      <div className="image-details-container">
        <img className="eventid-image" src={data.image.url} alt={data.name} />
        <div className="details-container">
          <div>
            <p>Sieges:</p>
            <div>
              <p>Orchestre : </p>
              <p>
                Places disponibles restantes : {data.seats.orchestre.quantity}
              </p>
              <p>Prix : {data.seats.orchestre.price} € </p>
            </div>
            <div>
              <p>Mezzanine</p>
              <p>
                Places disponibles restantes : {data.seats.mezzanine.quantity}
              </p>
              <p>Prix: {data.seats.mezzanine.price} €</p>
            </div>

            <div className="reservation-container">
              <div>
                <p>RESERVER</p>
                <FontAwesomeIcon
                  icon="fa-solid fa-ticket"
                  className="ticket-icon"
                  onClick={handleReservationClick}
                />
              </div>
              {!isLoggedIn && showLoginMessage && (
                <div className="login-message">
                  <p>Se connecter ou créer son compte</p>
                </div>
              )}
            </div>
          </div>

          <div className="promoted-by-containerid">
            <p>Promoted by</p>
            <img
              className="avatarevent"
              src={data.owner.account.avatar.secure_url}
              alt={data.owner.account.username}
            />
          </div>
        </div>
      </div>

      <p>{new Date(data.date).toLocaleDateString()}</p>
    </div>
  );
};
export default Event;
