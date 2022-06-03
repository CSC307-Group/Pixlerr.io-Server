import React, { useState } from "react";
import "./style.scss";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const nav = useNavigate();
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [data, setData] = useState(null);

  const register = () => {
    Axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword,
      },
      withCredentials: true,
      url: "http://localhost:5000/register",
    }).then((res) => console.log(res));
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
    }).then( 
      (res) => {console.log(res);
      if(res.data == "Successfully Authenticated"){
        nav('/');
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
            <button className="button" onClick={register}>Register</button>
          </div>
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
            <button className="button" href="/Account" onClick={() => { login(); getUser()}}>Login</button>
          </div>
        </div>
      </div>
    </div>
    {data ? null:  <h1>Invaild username or password. Please try again.</h1>}
    </div>
  );
}

export default Login;