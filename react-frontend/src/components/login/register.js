import React, { useState } from "react";
import loginImg from "./login.svg";
import axios from 'axios';
// import { withRouter } from '../withRouter.js';

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
export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    {
      username: "",
      email: "",
      password: "",
    };

  }
  submitForm() {
    userPost(this.state)
    this.props.navigate('/');
  }


  handleChange(event) {
    const { name, value } = event.target;
    if (name === "email")
      this.setState({ username: this.state.name, email: value, password: this.state.password })
    else if (name === "username")
      this.setState({ username: value, email: this.state.email, password: this.state.password })
    else
      this.setState({ username: this.state.username, email: this.state.email, password: value })
  }
  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="username" onChange={e => this.handleChange(e)} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" placeholder="email" onChange={e => this.handleChange(e)} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" onChange={e => this.handleChange(e)} />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick={e => this.submitForm(e)}>
            Register
          </button>
        </div>
      </div>
    );
  }

} 