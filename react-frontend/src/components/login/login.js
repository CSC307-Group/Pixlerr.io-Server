import React from "react";
import loginImg from "./login.svg";
import axios from 'axios';
async function getUser(user) {
  try {
    const response = await axios.get(`http://localhost:5000/users/?username=${user.username}&password=${user.password}`);
    return response.data.users_list;
  }
  catch (error) {
    console.log(error);
    return false;
  }
}
export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    {
      username: "",
      password: "",
    };
  }

  submitForm() {
    let res = getUser(this.state)
    if (res.status === 201) {
      //redirect and set user state to logged in with respective credentials
    }
    else {
      //render incorrect credentials message
    }
  }
  handleChange(event) {
    const { name, value } = event.target;
    if (name === "username")
      this.setState({ username: value, password: this.state.password })
    else
      this.setState({ username: this.state.username, password: value })
  }
  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
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
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" onChange={e => this.handleChange(e)} />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick={e => this.submitForm(e)}>
            Login
          </button>
        </div>
      </div>
    );
  }
}