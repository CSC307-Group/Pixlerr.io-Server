import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./styles/App.scss";
import Countdown from 'react-countdown';
import Sidebar from './Sidebar';
import Signup from './Pages/Signup';
import Login from './components/login/login';
import { About } from './Pages/About';
import { Account } from './Pages/Account';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

ReactDOM.render(<App />, document.getElementById('root'));
const Completionist = () => <span>You can place a pixel!</span>;
const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    return <Completionist />;
  } else {
    return <span>Time until next pixel: {minutes}:{seconds}</span>;
  }

};


ReactDOM.render((
  <Router>
    <Sidebar />
    <Countdown date={Date.now() + 60000} renderer={renderer} />

    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/About" element={<About />} />
      <Route path="/Login" element={<Login />} />

      <Route path="/Account" element={() => <Account />} />
    </Routes>

  </Router>
), document.getElementById('root')
);

