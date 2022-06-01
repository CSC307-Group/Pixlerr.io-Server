import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from "./components/login/login";
import Register from './components/login/register';
import "./styles/App.scss";
import Countdown from 'react-countdown';
import Sidebar from './Sidebar';
import RequireAuth from './components/requireAuth';

import { About } from './Pages/About';
import { Account } from './Pages/Account';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/Auth';
import Unauthorized from './components/login/unauthorized';

const ROLES = {
  'User': 2001,
  'Admin': 5150
}

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
  <React.StrictMode>
  <Router>
    <Sidebar />
    <Countdown date={Date.now() + 60000} renderer={renderer} />
    <AuthProvider>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/About" element={<About/>} />
      <Route path="/Login" element={ <Login /> } />
      <Route path="/Signup" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/Account" element={<Account />} />
        </Route>
    </Routes>

    </AuthProvider>
  </Router>
  </React.StrictMode>
), document.getElementById('root')
);

