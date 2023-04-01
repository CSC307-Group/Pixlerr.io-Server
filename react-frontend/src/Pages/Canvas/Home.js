import React, { useState, useEffect } from "react";
import axios from "axios";
import Editor from "./Editor";
import Sidebar from "../Sidebar";
import { io } from "socket.io-client";
import "./home.scss";

const pixelhost = process.env.REACT_APP_BACKEND_URL + "/pixels";
const socket = io(process.env.REACT_APP_BACKEND_URL, { forceNew: true, secure: true });

export default function App(props) {

  const { activeUser, isLoggedIn, updateUserTime } = props;
  const [pixels, setPixels] = useState([]);

  useEffect(() => {
    socket.on("connected", (res) => {
      setPixels(res.pixelList);
    })
  }, []);

  async function makePixelPatchCall(data) {
    try {
      const response = await axios.patch(pixelhost, data);
      console.log(response);
      return response.status === 204;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function updatePixel(pixel, newColor) {
    if (!isLoggedIn) return;
    else {
      console.log(activeUser);
      const pixelUpdated = await makePixelPatchCall({
        pixelData: pixel,
        newColor: newColor,
        userData: activeUser
      });

      if (pixelUpdated) {
        updateUserTime()
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
    if (activeUser["_id"] === "6424a9d19f7da9dd6a5d0146") callDeleteThanPost();
  }

  return (
    <div className="App">
      <Sidebar isLoggedIn={isLoggedIn} />
      <Editor
        pixelList={pixels}
        updatePixel={updatePixel}
        resetCanvas={resetCanvas}
        id={activeUser["_id"]}
      />
      <span>
        {isLoggedIn
        ? "You may place a pixel once per minute"
        : "Log in to place pixels"}
      </span>
    </div>
  );
}
