import React from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import useLocalStorage from "./UseLocalStorageHook";
import About from "./Pages/About";
import Account from "./Pages/Account";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login";
import Logout from "./Pages/Logout";

const userhost = process.env.REACT_APP_BACKEND_URL + "/users";

export default function App() {
  const [activeUser, setActiveUser] = useLocalStorage("activeUser", { _id: "", pixelTime: "" });
  const [isLoggedIn, setLoginStatus] = useLocalStorage("loginStatus", false);

  // window.addEventListener("beforeunload", (event) => {
  //   setActiveUser({ _id: "", pixelTime: "" });
  //   setLoginStatus(false);
  // });

  async function updateUserTime() {
    try {
      if (activeUser["_id"] === "6424a9d19f7da9dd6a5d0146") return false;
      const response = await axios.patch(userhost, activeUser);
      setActiveUser(response);
    } 
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home 
          activeUser={activeUser} 
          isLoggedIn={isLoggedIn} 
          updateUserTime={updateUserTime} 
        />} />

        <Route path="/About" element={<About 
          isLoggedIn={isLoggedIn}  
        />} />

        <Route path="/Account" element={<Account 
          activeUser={activeUser} 
          isLoggedIn={isLoggedIn} 
        />} />
        
        <Route path="/Login" element={<Login 
          setActiveUser={setActiveUser} 
          isLoggedIn={isLoggedIn}  
          setLoginStatus={setLoginStatus} 
        />} />

        <Route path="/Logout" element={<Logout 
          setActiveUser={setActiveUser} 
          setLoginStatus={setLoginStatus} 
        />} />
      </Routes>
    </div>
  );
}
