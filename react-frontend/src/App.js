import React from "react";
import "./styles/App.scss";
import Editor from "./Editor";

export default function App() {

	
	const pixelList = [
		{
			color: "#32cd32",
			x: 5,
			y: 0
		},
		{
			color: "#1660D0",
			x: 10,
			y: 15
		}
	]

	function addPixel(pixel) {
		let	oldPixel = pixelList.filter(data => 
			data['x'] === pixel['x'] && data['y'] === pixel['y']);
		if (oldPixel.length === 0)
			pixelList.push(pixel);
		else
			oldPixel[0]['color'] = pixel['color'];
	}
  
    return (
        <div className="App">
        	<Editor 
				pixelList={pixelList}
				addPixel={addPixel} />
        </div>
    );
}
