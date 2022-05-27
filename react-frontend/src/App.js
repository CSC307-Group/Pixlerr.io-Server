import axios from 'axios';
import Editor from "./Editor";
import React, {useState, useEffect} from 'react';
import "./styles/App.scss";

const localhost = 'http://localhost:5000/pixels';

export default function App() {
	const [pixels, setPixels] = useState([]);

	useEffect(() => {
		fetchAll().then( result => {
			if (result) {
				console.log(result);
				setPixels(result);
			}
		});
	}, [] );
	// }, [pixels] ); // Autorefreshes page but is crazy resource intensive

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

	async function makePatchCall(updatedData) {
		try {
			const response = await axios.patch(localhost, updatedData);
			return response;
		}
		catch (error) {
			console.log(error);
			return false;
		}
	}

	function updatePixel(id, newColor) {
		const data = [id, newColor];
		makePatchCall(data);
	}

	async function makeDeleteCall() {
		try {
			const response = await axios.delete(localhost);
			return response;
		}
		catch (error) {
			console.log(error);
			return false;
		}
	}

	async function makePostCall(dimensions) {
		try {
			const response = await axios.post(localhost, dimensions);
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


