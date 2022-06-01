import React from "react";
import axios from "../api/axios";
import "./account.scss";
import { Redirect } from 'react-router-dom';

async function userGet(user) {
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

export class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          auth: 0
        };
      }

    render() {
      return (
        <div className="base-container" ref={this.props.containerRef}>
          <div className="header">Account Information</div>
          <div className="content">
            <div className="accountinfo">
             If you're here you are allowed to be here
            </div>
            <div className="pixelhistory">
            Test
            </div>
          </div>
        </div>
      );
    }
  }