import React, { useState } from "react";
import loginImg from "./login.svg";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import login from "../..";
import { read } from "fs";


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
    const response = await axios.get(`http://localhost:5000/users/?username=${user.username}`);
    return response;
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
    password: "",
    user_email: "",
  };


  function submitForm() {


    getUser(state).then((result) => {
      console.log(result)
    });


    // if (r.status == undefined)
    //   navigate('/');


  }


  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "password")
      state = { username: state.username, password: value, user_email: state.user_email }
    else if (name === "username")
      state = { username: value, password: state.password, user_email: state.user_email }
    else
      state = { username: state.username, password: state.password, user_email: value }
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
              <input type="text" name="password" placeholder="password" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">email</label>
              <input type="text" name="user_email" placeholder="Email" onChange={handleChange} />
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
