import React, { useState, useEffect } from "react";
// import axios from "axios";
import Editor from "./Editor";
import Sidebar from "../Sidebar";
import { io } from "socket.io-client";
import "./home.scss";

// const pixelhost = process.env.REACT_APP_BACKEND_URL + "/pixels";
const socket = io(process.env.REACT_APP_BACKEND_URL, { forceNew: true, secure: true });

export default function App(props) {

  const { activeUser, isLoggedIn, updateUserTime } = props;
  const [pixels, setPixels] = useState([]);

  useEffect(() => {
    socket.emit("connected", (newPixels) => {
      setPixels(newPixels);
    })
  }, []);

  socket.on("updateCanvas", (res) => {
    const pixelsCopy = [...pixels];
    pixelsCopy[res.index] = res.updatedPixel;
    setPixels(pixelsCopy);
  })

  async function updatePixel(pixel, newColor) {
    if (!isLoggedIn) return;
    socket.emit("pixelUpdate", pixel, newColor, activeUser, () => { updateUserTime(); })
  }

  // async function makeDeleteCall() {
  //   try {
  //     const response = await axios.delete(pixelhost);
  //     return response;
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // }

  // async function makePostCall(dimensions) {
  //   try {
  //     const response = await axios.post(pixelhost, dimensions);
  //     return response;
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // }

  // async function callDeleteThanPost() {
  //   const dimensions = { height: 20, width: 40 };
  //   await makeDeleteCall();
  //   await makePostCall(dimensions);
  // }

  function resetCanvas() {
    socket.emit("resetCanvas", activeUser, (newCanvas) => {
      setPixels(newCanvas);
    });
  }

  return (
    <div className="App">
      <Sidebar isLoggedIn={isLoggedIn} />
      <Editor
        pixelList={pixels}
        updatePixel={updatePixel}
        resetCanvas={resetCanvas}
        userType={activeUser["type"]}
      />
      <span>
        {isLoggedIn
        ? "You may place a pixel once per minute"
        : "Log in to place pixels"}
      </span>
    </div>
  );
}
