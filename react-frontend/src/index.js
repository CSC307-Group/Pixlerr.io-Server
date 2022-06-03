import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./styles/App.scss";
import Login from './Pages/Login';
import { About } from './Pages/About';
import Account from './Pages/Account';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Signout from './Pages/Logout';


ReactDOM.render((
  <App />,
  <Router>


    

    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/About" element={<About />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Account" element={<Account />} />
      <Route path="/Logout" element={<Signout />} />
    </Routes>

  </Router>
), document.getElementById('root')
);

