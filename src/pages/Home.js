import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Audio } from "react-loader-spinner";

const Home = ({
  search,
  events,
  dateRange,
  setFilteredEvents,
  setDateRange,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const startDate = dateRange.startDate
          ? dateRange.startDate.toISOString().split("T")[0]
          : "";
        const endDate = dateRange.endDate
          ? dateRange.endDate.toISOString().split("T")[0]
          : "";
        const response = await axios.get(
          `http://localhost:3000/events?startDate=${startDate}&endDate=${endDate}&name=${search}`
        );
        console.log("Response:", response.data);
        setFilteredEvents(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [dateRange, setFilteredEvents, search]);

  const filterEvents = () => {
    if (dateRange.startDate && dateRange.endDate) {
      const filteredEvents = Array.isArray(events)
        ? events.filter((event) => {
            const eventDate = new Date(event.date);
            const startDate = new Date(dateRange.startDate);
            const endDate = new Date(dateRange.endDate);

            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(23, 59, 59, 999);

            return eventDate >= startDate && eventDate <= endDate;
          })
        : [];

      return filteredEvents;
    }

    return Array.isArray(events) ? events : [];
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
