import React, { useState } from "react";
import loginImg from "./login.svg";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import login from "../..";


async function userPost(user) {

  console.log(user);
  try {
    const response = await axios.post('http://localhost:5000/users', user);
    return response;
  }
  catch (error) {
    console.log(error);
    return false;
  }
}
async function getUser(user) {
  try {
    const response = await axios.get(`http://localhost:5000/users/?username=${user.username}&password2=${user.password2}`);
    return response.data;
  }
  catch (error) {
    console.log(error);
    return false;
  }
}
function Register() {
  const navigate = useNavigate();
  let userExists = false;
  let state =
  {
    username: "",
    password1: "",
    password2: "",
  };


  function submitForm() {
    let res = getUser(state);
    if (res.staus == 500) {
      userPost(state);
    }
    else {

    }
      
    if (!userExists) {
      navigate('/');
    }

  }


  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "password1")
      state = { username: state.username, password1: value, password2: state.password2 }
    else if (name === "username")
      state = { username: value, password1: state.password1, password2: state.password2 }
    else
      state = { username: state.username, password1: state.password1, password2: value }
  }
  if (!userExists) {
    return (

      <div className="base-container" >
        <div className="header">Register</div>
        <div className="content">
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username </label>
              <input type="text" name="username" placeholder="username" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password1">password </label>
              <input type="text" name="password1" placeholder="password" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password2">Confirm password </label>
              <input type="password2" name="password2" placeholder="Confirm Password" onChange={handleChange} />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick={submitForm}>
            Register
          </button>
        </div>
      </div>
    );
  }
  else {
    return (

      < div className="base-container" >
        <div className="header">Register</div>
        <div className="content">
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username </label>
              <input type="text" name="username" placeholder="username" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password1">password2 </label>
              <input type="password2" name="password1" placeholder="password1" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password2">Confirm password2 </label>
              <input type="password2" name="password2" placeholder="password2" onChange={handleChange} />
            </div>
            username already taken!
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick={submitForm}>
            Register
          </button>
        </div>
      </div >
    );

  }
}
export default Register;
