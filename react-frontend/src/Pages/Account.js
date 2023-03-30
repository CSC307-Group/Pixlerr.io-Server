import { React, useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import DrawingPanel from "./Home/DrawingPanel";
import "./account.scss";

const pixelhost = process.env.REACT_APP_BACKEND_URL + "/pixels";

function Account (props) {
  const { activeUser, isLoggedIn } = props;
  const [pixelList, setPixels] = useState([]);

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
    return "#fff";
  }

  return (
    <div>
      <Sidebar isLoggedIn={isLoggedIn} />
      <div className="base-container">
        <div className="header">Account Information</div>
        <div className="content">
          <div className="accountinfo">Welcome Back, {activeUser.username}!</div>
          <div className="pixelhistory"></div>
        </div>
      </div>
      {(< DrawingPanel
        selectedColor={"transparent"}
        pixelList={pixelList}
        updatePixel={() => {}}  
        setMouseColor={() => {}}
        pixelFilterFunction={postedByUser}
        blankColor={returnWhitePixel}
      />)}
    </div>
  );
}

export default Account;
