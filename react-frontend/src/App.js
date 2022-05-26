import axios from 'axios';
import Editor from "./Editor";
import React, { useState, useEffect } from 'react';
import "./styles/App.scss";

const localhost = 'http://localhost:5000/pixels';

export default function App() {
	const [pixels, setPixels] = useState([]);

	useEffect(() => {
		const interval = setInterval(() => {
			fetchAll().then(result => {
				if (result) {
					console.log(result);
					setPixels(result);
				}
			});
			console.log('This will run every second!');
		}, 1000);
		return () => clearInterval(interval);

	}, []);
	// }, [pixels] ); // Replace above line with this line when we have database setup -> should auto-refresh page

	async function fetchAll() {
		try {
			const response = await axios.get(localhost);
			console.log(response.data.pixelList);
			return response.data.pixelList;

		}
		catch (error) {
			console.log(error);
			return false;
		}
	}

	async function makePostCall(pixel) {
		try {
			const response = await axios.post(localhost, pixel);
			return response;
		}
		catch (error) {
			console.log(error);
			return false;
		}
	}



	function updatePixel(pixel) {
		makePostCall(pixel);
	}

	return (
		
		<div className="App">
			<Editor
				pixelList={pixels}
				updatePixel={updatePixel} />
		</div>
	);
}


