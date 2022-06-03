import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./styles/App.scss";
<<<<<<< HEAD
import Countdown from 'react-countdown';

=======
// import Countdown from 'react-countdown';
import Sidebar from './Sidebar';
>>>>>>> 91d3ad3164dc522de92e630bfb91c6b9c5feb150
import Signup from './Pages/Signup';
import Login from './components/login/login';
import { About } from './Pages/About';
import Account from './Pages/Account';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signout from './Signout';

ReactDOM.render((
  <App />,
  <Router>
<<<<<<< HEAD

    <Countdown date={Date.now() + 60000} renderer={renderer} />

=======
    <Sidebar />
>>>>>>> 91d3ad3164dc522de92e630bfb91c6b9c5feb150
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/About" element={<About />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Account" element={<Account />} />
      <Route path="/signout" element={<Signout />} />
    </Routes>

  </Router>
), document.getElementById('root')
);

