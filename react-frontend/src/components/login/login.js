import React, { useState } from "react";
import "./style.scss";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Sidebar";

function Login() {
  const nav = useNavigate();
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [reg, setReg] = useState(false);
  const [logged, setLogged] = useState(false);
  const [exists, setExists] = useState(false);

  const register = () => {
    Axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword,
      },
      withCredentials: true,
      url: "http://localhost:5000/register",
    }).then((res) => {
      console.log(res);
      if (res.data == "User Created") {
        setReg(true);
      } else {
        setExists(true);
      }
    });
  };
  const login = () => {
    Axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:5000/login",
    }).then((res) => {
      console.log(res);
      if (res.data == "Successfully Authenticated") {
        nav("/");
      } else {
        setLogged(true);
      }
    });
  };
  const getUser = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/users",
    }).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div>
      <Sidebar />
      <div className="base-containers1">
        <div className="content">
          <div className="form">
            <h1 className="h1">Register</h1>
            <div className="form-group">
              <input
                type="text"
                placeholder="username"
                onChange={(e) => setRegisterUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="password"
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
            </div>
            <div className="footer">
              <button className="button" onClick={register}>
                Register
              </button>
            </div>
            {reg ? <h5>Account made! You can now login.</h5> : null}
            {exists ? <h5>Username is taken! Try a different one.</h5> : null}
          </div>

          <div className="form">
            <h1 className="h1">Login</h1>
            <div className="form-group">
              <input
                type="text"
                placeholder="username"
                onChange={(e) => setLoginUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="password"
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <div className="footer">
              <button
                className="button"
                href="/Account"
                onClick={() => {
                  login();
                  getUser();
                }}
              >
                Login
              </button>
            </div>
            {logged ? <h5>Invalid username or password. Try Again!</h5> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
