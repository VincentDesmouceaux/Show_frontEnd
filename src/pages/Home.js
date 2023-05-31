import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Audio } from "react-loader-spinner";

const Home = ({ search }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortedData, setSortedData] = useState([]);
  const navigate = useNavigate();

  const getFilteredData = () => {
    if (!search) {
      return data;
    }
    return data.filter(
      (event) =>
        event.name.toLowerCase().includes(search.toLowerCase()) ||
        event.date.toLowerCase().includes(search.toLowerCase())
    );
  };

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

  const handleSort = (range) => {
    if (range) {
      const filteredData = getFilteredData();
      const sorted = filteredData.sort((a, b) => {
        const aDate = new Date(a.date);
        const bDate = new Date(b.date);
        return aDate - bDate;
      });
      setSortedData(sorted);
    } else {
      setSortedData([]);
    }
  };

  const filteredData = getFilteredData();

  return isLoading ? (
    <Audio
      height="80"
      width="80"
      radius="9"
      color="skyblue"
      ariaLabel="loading"
      //   wrapperStyle
      //   wrapperClass
    />
  ) : (
    <>
      {sortedData.length > 0 ? (
        sortedData.map((event) => (
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
      ) : filteredData.length > 0 ? (
        filteredData.map((event) => (
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
      )}
    </>
  );
};

export default Home;
