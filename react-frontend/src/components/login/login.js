// import React from "react";
// // import loginImg from "./login.svg";
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// async function getUser(user) {
//   try {
//     const response = await axios.get(`http://localhost:5000/users/?username=${user.username}&password=${user.password}`);
//     return response.data.users_list;
//   }
//   catch (error) {
//     console.log(error);
//     return false;
//   }
// }

// export class Login extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state =
//     {
//       auth: 0,
//       username: "",
//       password: "",
//     };
//   }

//   submitForm() {
//     let res = getUser(this.state)
//     if (res.status === 201) {
//       //redirect and set user state to logged in with respective credentials
//     }
//     else {
//       //render incorrect credentials message
//     }
//   }
//   handleChange = ([props]) => {
//     const navigate = useNavigate();
//     // const { name, value } = event.target;
//     // if (name === "username")
//     //   this.setState({ username: value, password: this.state.password })
//     // else
//     //   this.setState({ username: this.state.username, password: value })
//     navigate('/Account');
//   }


//   render() {
//     return (
//       <div className="base-container" ref={this.props.containerRef}>
//         <div className="header">Login</div>
//         <div className="content">
//           <div className="image">
//             {/* <img src={loginImg} /> */}
//           </div>
//           <div className="form">
//             <div className="form-group">
//               <label htmlFor="username">Username</label>
//               <input type="text" name="username" placeholder="username" onChange={e => this.handleChange(e)} />
//             </div>
//             <div className="form-group">
//               <label htmlFor="password">Password</label>
//               <input type="password" name="password" placeholder="password" onChange={e => this.handleChange(e)} />
//             </div>
//           </div>
//         </div>
//         <div className="footer">
//           <button type="button" className="btn" onClick={e => this.handleChange(e)}>
//             Login
//           </button>
//         </div>
//       </div>
//     );
//   }
// }

import React, { useState } from "react";
import "./style.scss";
import Axios from "axios";

function Login() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
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
    }).then((res) => console.log(res));
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
            <button className="button" href="#" onClick={() => { login(); getUser(); }}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;