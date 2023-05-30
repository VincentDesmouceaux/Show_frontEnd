import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Audio } from "react-loader-spinner";

const Home = (search) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--show-backend--5rcbdjs6tgqv.code.run/events`
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [search]);

  return isLoading ? (
    <Audio
      height="80"
      width="80"
      radius="9"
      color="skyblue"
      ariaLabel="loading"
      wrapperStyle
      wrapperClass
    />
  ) : (
    <>
      {data.map((event) => (
        <div key={event._id}>
          <img src={event.image.url} alt={event.name} />
          <p>Name: {event.name}</p>
          <p>Date: {event.date}</p>
          <p>Seats:</p>
          <ul>
            {Object.entries(event.seats).map(([seatType, seatData]) => (
              <li key={seatType}>
                {seatType}: {seatData.quantity} (Price: {seatData.price})
              </li>
            ))}
          </ul>
          <div>
            <p>Owner: {event.owner.account.username}</p>
            <img
              src={event.owner.account.avatar.secure_url}
              alt={event.owner.account.username}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default Home;
