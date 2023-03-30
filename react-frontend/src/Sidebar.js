import { React, useEffect, useState } from "react";
import { fallDown as Menu } from "react-burger-menu";
import axios from "axios";
import "./sidebar.scss";

const userhost = process.env.REACT_APP_BACKEND_URL + "/users";

export default function Sidebar() {
  const [activeUser, login] = useState("");

  // TODO: Add websocket
  useEffect(() => {
    getUser();
  }, [activeUser]);

  const getUser = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: userhost,
    }).then((res) => {
      login(res.data);
    });
  };

  return (
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>
      {activeUser.username === undefined ? (
        <a className="menu-item" href="/Login">
          Login/Signup
        </a>
      ) : (
        <a className="menu-item" href="/Account">
          Account
        </a>
      )}

      <a className="menu-item" href="/About">
        About
      </a>
      {activeUser.username === undefined ? null : (
        <a className="menu-item" href="/Logout">
          Logout
        </a>
      )}
    </Menu>
  );
}
