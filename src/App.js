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
        const response = await axios.get(
          `https://site--show-backend--5rcbdjs6tgqv.code.run/events`
        );
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
        ></Header>
        <Routes>
          <Route path="/" element={<Home search={search} />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
