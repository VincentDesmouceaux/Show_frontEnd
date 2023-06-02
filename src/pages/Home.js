import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Audio } from "react-loader-spinner";

const Home = ({ search, events, dateRange }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/events`);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const filterEvents = () => {
    if (search || (dateRange.startDate && dateRange.endDate)) {
      const filteredEvents = Array.isArray(data)
        ? data.filter((event) => {
            const eventDate = new Date(event.date);
            const startDate = new Date(dateRange.startDate);
            const endDate = new Date(dateRange.endDate);

            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(23, 59, 59, 999);

            const isNameMatch = event.name
              .toLowerCase()
              .includes(search.toLowerCase());
            const isDateMatch = eventDate >= startDate && eventDate <= endDate;

            return (search && isNameMatch) || (!search && isDateMatch);
          })
        : [];

      return filteredEvents;
    }

    return data;
  };

  const filteredEvents = filterEvents();

  return isLoading ? (
    <Audio
      height="80"
      width="80"
      radius="9"
      color="skyblue"
      ariaLabel="loading"
    />
  ) : filteredEvents.length > 0 ? (
    filteredEvents.map((event) => (
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
    ))
  ) : (
    <p>No events found.</p>
  );
};

export default Home;
