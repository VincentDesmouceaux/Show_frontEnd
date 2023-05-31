import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Home from "./pages/Home";
import Header from "./components/Header";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMagnifyingGlass,
  faKey,
  faArrowRightToBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

library.add(faMagnifyingGlass, faKey, faArrowRightToBracket, faUser);

function App() {
  const [search, setSearch] = useState("");
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [data, setData] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const handleToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token, { expires: 7 });
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/events`);
        setData(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Router>
        <Header
          search={search}
          setSearch={setSearch}
          token={token}
          handleToken={handleToken}
          data={data}
          setFilteredEvents={setFilteredEvents}
        />
        <Routes>
          <Route
            path="/"
            element={<Home search={search} events={filteredEvents} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
