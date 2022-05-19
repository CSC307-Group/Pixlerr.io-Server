const cors = require("cors");
const express = require("express");
const pixelServices = require('./models/pixel-services');

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

// $export DEBUG='express:router'
// $npm run dev   =    $nodemon backend.js
// $npm start     =    $node backend.js

app.get("/pixels", async (req, res) => {
	try {
		const result = await pixelServices.getPixels();
		res.send({pixelList: result});
	} 
	catch (error) {
	console.log(error);
	res.status(500).send('An error ocurred in the server.');
	}
});

app.post("/pixels", async (req, res) => {
	const pixel = req.body;
	const updatedPixel = await pixelServices.updatePixel(pixel);
	if (updatedPixel)
		res.status(201).end();
	else
		res.status(500).end();
});

app.listen(port, () => {
  	console.log(`Pixlerr listening at http://localhost:${port}`);
});
