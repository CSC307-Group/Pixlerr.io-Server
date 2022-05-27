import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./styles/App.scss";
import Countdown from 'react-countdown';
import Sidebar from './Sidebar';
import Signup from './Pages/Signup';
import { About } from './Pages/About';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render((
  <Router>
    <Sidebar />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/About" element={<About />} />
    </Routes>
  </Router>
), document.getElementById('root')
);

