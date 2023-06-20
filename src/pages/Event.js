import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Audio } from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Event = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
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

  return isLoading ? (
    <Audio
      height="80"
      width="80"
      radius="9"
      color="skyblue"
      ariaLabel="loading"
    />
  ) : (
    <div>
      <img src={data.image.url} alt={data.name} />
      <p>{data.name}</p>
      <p>{new Date(data.date).toLocaleDateString()}</p>

      <div>
        <p>Sieges:</p>
        <div>
          <p>Orchestre : </p>
          <p>Places disponibles restantes : {data.seats.orchestre.quantity}</p>
          <p>Prix : {data.seats.orchestre.price} € </p>
        </div>
        <div>
          <p>Mezzanine</p>
          <p>Places disponibles restantes : {data.seats.mezzanine.quantity}</p>
          <p>Prix: {data.seats.mezzanine.price} €</p>
        </div>
        <FontAwesomeIcon icon="fa-solid fa-ticket" />
      </div>

      <div>
        <p>Promoted by</p>
        <img
          src={data.owner.account.avatar.secure_url}
          alt={data.owner.account.username}
        />
        <p>{data.owner.account.username}</p>
      </div>
    </div>
  );
};
export default Event;
