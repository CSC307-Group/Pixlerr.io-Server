import axios from "axios";
import Editor from "./Editor";
import React, { useState, useEffect } from "react";
import "./styles/App.scss";
import Sidebar from "./Sidebar";
const userhost = "http://localhost:5000/users";
const pixelhost = "http://localhost:5000/pixels";

export default function App() {
  const [user, setUser] = useState({ loggedIn: false });
  const [pixels, setPixels] = useState([]);
  const [activeUser, login] = useState({ _id: "", pixelTime: "" });
  const [loggedIn, setLogin] = useState(false);

  useEffect(() => {
    fillUserStates();
  }, []);

  const fillUserStates = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: userhost,
    }).then((res) => {
      login(res.data);
      if (res.data !== "") setLogin(true);
    });
  };

  useEffect(() => {
    setTimeout(function () {
      fetchPixels().then((result) => {
        if (result) {
          setPixels(result);
        }
      });
    }, 500);
  }, [pixels]);

  async function fetchPixels() {
    try {
      const response = await axios.get(pixelhost);
      return response.data.pixelList;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function makeUserPatchCall() {
    try {
      if (activeUser["_id"] === "629920b5b7f6f6424b76306c") return false;
      const response = await axios.patch(userhost, activeUser);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function makePixelPatchCall(updatedData) {
    try {
      const response = await axios.patch(pixelhost, updatedData);
      console.log(response);
      return response.status === 204;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function updatePixel(pixelId, newColor) {
    if (!loggedIn) return;
    else {
      const data = [
        pixelId,
        newColor,
        activeUser["_id"],
        activeUser["pixelTime"],
      ];
      const pixelUpdated = await makePixelPatchCall(data);
      if (pixelUpdated) {
        const userTimeUpdated = await makeUserPatchCall();
        if (userTimeUpdated) {
          fillUserStates();
        }
      }
    }
  }

  async function makeDeleteCall() {
    try {
      const response = await axios.delete(pixelhost);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function makePostCall(dimensions) {
    try {
      const response = await axios.post(pixelhost, dimensions);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function callDeleteThanPost() {
    const dimensions = { height: 20, width: 40 };
    await makeDeleteCall();
    await makePostCall(dimensions);
  }

  function resetCanvas() {
    if (activeUser["_id"] === "629920b5b7f6f6424b76306c") callDeleteThanPost();
  }

  return (
    <div className="App">
      <Sidebar />
      <Editor
        pixelList={pixels}
        updatePixel={updatePixel}
        resetCanvas={resetCanvas}
        id={activeUser["_id"]}
      />
      <span>
        {loggedIn
          ? "You may place a pixel once per minute"
          : "Log in to place pixels"}
      </span>
    </div>
  );
}
