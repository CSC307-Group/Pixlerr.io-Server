import axios from 'axios';
import Editor from "./Editor";
import React, {useState, useEffect} from 'react';
import Sidebar from "./Sidebar";
import "./styles/App.scss";
const localhost = 'http://localhost:5000/pixels';

export default function App() {
	const [pixels, setPixels] = useState([]);

	useEffect(() => {
		fetchAll().then( result => {
			if (result) {
				setPixels(result);
			}
		});
	}, [] );

	async function fetchAll() {
		try {
			const response = await axios.get(localhost);
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

	function addPixel(pixel) {
		makePostCall(pixel).then( result => {
			if (result && result.status === 201)
				setPixels([...pixels, pixel]);
		})
	}
  
    return (
        <div className="App">
			<Sidebar/>
        	<Editor 
				pixelList={pixels}
				addPixel={addPixel} />
        </div>
    );
}
