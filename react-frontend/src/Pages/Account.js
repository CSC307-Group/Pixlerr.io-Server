import { React, useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import DrawingPanel from "./Home/DrawingPanel";
import "./account.scss";

const userhost = process.env.REACT_APP_BACKEND_URL + "/users";
const pixelhost = process.env.REACT_APP_BACKEND_URL + "/pixels";

function Account () {
  const [pixelList, setPixels] = useState([]);
  const [activeUser, login] = useState({username: ""});

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: userhost,
    }).then((res) => {
      login(res.data);
    });
  };

  useEffect(() => {
    fetchPixels().then( result => {
      if (result) {
        setPixels(result);
      }
    });
  }, [] );

	async function fetchPixels() {
		try {
			const response = await axios.get(pixelhost);
			return response.data.pixelList;
		}
		catch (error) {
			console.log(error);
			return false;
		}
	}

  function postedByUser(pixel) {
    return (pixel['userId'] === activeUser['_id']);
  }
  
  function returnWhitePixel(pixel) {
    let whitePixel = pixel;
    whitePixel['color'] = "#fff";
    return whitePixel;
  }

  return (
    <div>
      <Sidebar />
      <div className="base-container">
        <div className="header">Account Information</div>
        <div className="content">
          <div className="accountinfo">Welcome Back!</div>
          <div>{activeUser.username}</div>
          <div className="pixelhistory"></div>
        </div>
      </div>
      {(< DrawingPanel
        selectedColor={"transparent"}
        pixelList={pixelList}
        updatePixel={() => {}}  
        setMouseColor={() => {}}
        postedByUser={postedByUser}
        returnWhitePixel={returnWhitePixel}
      />)}
    </div>
  );
}

export default Account;
