import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import axios from "axios";

import Home from "./pages/Home";
import Event from "./pages/Event";
import PromoterLogin from "./pages/Promoterlogin";
import PromoterSignUp from "./pages/Promotersingup";
import Header from "./components/Header";
import ModifyEvent from "./pages/ModifyEvent";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMagnifyingGlass,
  faKey,
  faRightToBracket,
  faUser,
  faUserLarge,
  faTicket,
  faCartShopping,
  faUserGear,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faMagnifyingGlass,
  faKey,
  faRightToBracket,
  faUser,
  faUserLarge,
  faTicket,
  faCartShopping,
  faUserGear,
  faPenToSquare,
  faTrash
);

function App() {
  const [search, setSearch] = useState("");
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const autocompleteRef = useRef(null);
  const handleToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token, { expires: 7 });
      setIsLoggedIn(true);
    } else {
      setToken(null);
      Cookies.remove("token");
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://site--show-backend--5rcbdjs6tgqv.code.run/events`);
        setData(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <Router>
        <Header
          search={search}
          setSearch={setSearch}
          setToken={setToken}
          token={token}
          handleToken={handleToken}
          data={data}
          setDateRange={setDateRange}
          dateRange={dateRange}
          autocompleteRef={autocompleteRef}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                search={search}
                events={filteredEvents}
                dateRange={dateRange}
                setFilteredEvents={setFilteredEvents}
              />
            }
          />
          <Route
            path="/event/:id"
            element={<Event isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/promoter/signup"
            element={<PromoterSignUp handleToken={handleToken} />}
          />
          <Route
            path="/promoter/login"
            element={<PromoterLogin token={token} handleToken={handleToken} />}
          />
          <Route
            path="/promoter/event/modify/:id"
            element={<ModifyEvent isLoggedIn={isLoggedIn} token={token} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
