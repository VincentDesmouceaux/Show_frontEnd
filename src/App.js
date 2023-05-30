import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

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
  const handleToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token, { expires: 7 });
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };

  return (
    <div>
      <Router>
        <Header search={search} setSearch={setSearch}></Header>
        <Routes>
          <Route path="/" element={<Home search={search} />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
