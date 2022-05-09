const cors = require('cors');
const express = require('express');
const app = express();
const port = 5000;

// $export DEBUG='express:router'
// $npm run dev   =    $nodemon backend.js
// $npm start     =    $node backend.js

app.use(cors());
app.use(express.json());

const pixels = {
    pixelList : 
    [
        {
            color: "#32cd32",
            x: 5,
            y: 0,
        },
        {
            color: "#1660D0",
            x: 10,
            y: 15,
        }
    ]
}

app.get('/pixels/', (req, res) => {
    res.send(pixels);
});

app.get('/pixels/:id', (req, res) => {
    const id = req.params['id']; 
    let result = findPixelById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {pixelList: result};
        res.send(result);
    }
});

function findPixelById(id) {
    return pixels['pixelList'].find( (pixel) => pixel['id'] === id); 
}

//pixels?username=
app.get('/pixels', (req, res) => {
    const username = req.query.username;
    if (username != undefined){
        let result = findPixelsPlacedBy(username);
        result = {pixelList: result};
        res.send(result);
    }
    else{
        res.send(pixels);
    }
});

const findPixelsPlacedBy = (name) => { 
    return pixels['pixelList'].filter( (pixel) => pixel['username'] === name); 
}

app.post('/pixels', (req, res) => {
    const newPixel = req.body;
    let index = pixels['pixelList'].findIndex(pixel =>
        pixel['x'] === newPixel['x'] && pixel['y'] === newPixel['y']);

    if (index === -1)
        pixels['pixelList'].push(newPixel);
    else
        pixels['pixelList'][index]['color'] = newPixel['color'];
   
    res.status(201).end();
});

// Clears out all pixel data
app.delete('/pixels/', (req, res) => {
    pixels['pixelList'] = [];
    res.status(204).end();
})

app.listen(port, () => {
    console.log(`Pixlerr listening at http://localhost:${port}`);
});