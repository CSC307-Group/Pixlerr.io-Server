import axios from 'axios';
import Editor from "./Editor";
import React, { useState, useEffect } from 'react';
import "./styles/App.scss";
// import Cursor from './Cursor';

//const userhost = 'http://localhost:5000/users';
const pixelhost = 'http://localhost:5000/pixels';

export default function App() {
	const [pixels, setPixels] = useState([]);
	const [activeUser, login] = useState();

	useEffect(() => {
		getUser();
	}, [] );

	const getUser = () => {
		axios({
		  method: "GET",
		  withCredentials: true,
		  url: "http://localhost:5000/users",
		}).then((res) => {
		  login(res.data);
		  console.log(res.data);
		});
	};

	useEffect(() => {
		setTimeout(function() {
			fetchPixels().then( result => {
				if (result) {
					setPixels(result);
				}
			});
		}, 500);
	}, [pixels] );

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

	async function makePatchCall(updatedData) {
		try {
			const response = await axios.patch(pixelhost, updatedData);
			return response;
		}
		catch (error) {
			console.log(error);
			return false;
		}
	}

	function updatePixel(id, newColor) {
		if (activeUser !== "") {
			const data = [id, newColor];
			makePatchCall(data);
		}
	}

	async function makeDeleteCall() {
		try {
			const response = await axios.delete(pixelhost);
			return response;
		}
		catch (error) {
			console.log(error);
			return false;
		}
	}

	async function makePostCall(dimensions) {
		try {
			const response = await axios.post(pixelhost, dimensions);
			return response;
		}
		catch (error) {
			console.log(error);
			return false;
		}
	}

	async function callDeleteThanPost() {
		const dimensions = {height : 20, width : 40};
		await makeDeleteCall();
		await makePostCall(dimensions);
	}

	function resetCanvas() {
		callDeleteThanPost();
	}

	

	return (
		<div className="App">
			<Editor
				pixelList={pixels}
				updatePixel={updatePixel}
				resetCanvas={resetCanvas} />
        </div>
    );
}


