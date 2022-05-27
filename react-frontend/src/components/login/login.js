import React from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { login } from '../../index'

function Login() {
  const navigate = useNavigate();
  console.log("test");
  let state = {
    username: "",
    password2: "",
  };
  async function getUser(user) {
    try {
      const response = await axios.get(`http://localhost:5000/users/?username=${user.username}&password2=${user.password2}`);
      return response;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }


  function submitForm() {
    let res = getUser(state)
    // if (res.status == 201) {
    //   login.loggedin = true;
    //   login.username = res.data[0].username
    //   login.id = res.data[0]._id
    // }
    if (true) {
      login.loggedin = true;
      login.username = "seena18";
      login.id = "1234";
    }
    else {
      //render incorrect credentials message
    }
    console.log(login.loggedin)
    navigate('/');
  }
  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "username")
      state = { username: value, password2: state.password2 }
    else
      state = { username: state.username, password2: value }
  }

  return (
    <div className="base-container">
      <div className="header">Login</div>
      <div className="content">
        <div className="form">
          <div className="form-group">
            <label htmlFor="username">Username </label>
            <input type="text" name="username" placeholder="username" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="password">password</label>
            <input type="password" name="password" placeholder="password" onChange={handleChange} />
          </div>
        </div>
      </div>
      <a href="register">Don't have an account? Click here to signup!</a>
      <div className="footer">
        <button type="button" className="btn" onClick={submitForm}>
          Login
        </button>
      </div>
    </div >
  );

}
export default Login;