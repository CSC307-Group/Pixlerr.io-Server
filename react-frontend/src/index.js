import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import { About } from "./Pages/About";
import Account from "./Pages/Account";
import Login from "./Pages/Login";
import Logout from "./Pages/Logout";

ReactDOM.render(
  ((<App />),
  (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/About" element={<About />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Account" element={<Account />} />
        <Route path="/Logout" element={<Logout />} />
      </Routes>
    </Router>
  )),
  document.getElementById("root")
);
