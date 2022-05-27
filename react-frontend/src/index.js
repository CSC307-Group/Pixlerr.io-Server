import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./styles/App.scss";
import Countdown from 'react-countdown';
import Sidebar from './Sidebar';
import Login from './components/login/login';
import Register from './components/login/register';
import Myaccount from './Myaccount';
import { About } from './Pages/About';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


ReactDOM.render(<App />, document.getElementById('root'));
export const login = {
  username: "",
  loggedin: false,
}
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
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/myaccount" element={<Myaccount />} />
      <Route path="/About" element={<About />} />
    </Routes>
  </Router >
), document.getElementById('root')
);
export default login;
