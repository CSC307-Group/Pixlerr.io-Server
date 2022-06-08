import { React, useEffect, useState } from "react";
import axios from "../api/axios";
import "./account.scss";
import { Redirect } from "react-router-dom";
import Sidebar from "../Sidebar";

const userhost = "http://localhost:5000/users";

export default function Account() {
  const [activeUser, login] = useState({ username: "" });

  useEffect(() => {
    getUser();
  }, []);

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
    <div>
      <Sidebar />
      <div className="base-container">
        <div className="header">Account Information</div>
        <div className="content">
          <div className="accountinfo">Welcome Back!</div>
          <div>{activeUser.username}</div>
          <div className="pixelhistory"></div>
        </div>
      </div>
    </div>
  );
}
