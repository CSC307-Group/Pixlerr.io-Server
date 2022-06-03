import {React, useEffect, useState} from "react";
import axios from "../api/axios";
import "./account.scss";
import DrawingPanel from "../DrawingPanel";

const userhost = 'http://localhost:5000/users';
const pixelhost = 'http://localhost:5000/pixels';

export default function Account () {
  const [pixelList, setPixels] = useState([]);
  const [activeUser, login] = useState({username: ""});

  useEffect(() => {
		getUser();
	}, [] );

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
    <div className="base-container">
      <div className="header">Account Information</div>
      <div className="content">
        <div className="accountinfo">
          Welcome Back! 
        </div>
        <div>
        {activeUser.username} 
        </div>
        <div className="pixelhistory">
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