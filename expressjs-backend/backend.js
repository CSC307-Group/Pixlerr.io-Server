const express = require('express');
const app = express();
const port = 5000;

// $export DEBUG='express:router'
// $npm run dev   =    $nodemon backend.js
// $npm start     =    $node backend.js

app.use(express.json());

const pixels = {
    pixel_list : 
    [
        {
            color: "#32cd32",
            x: 5,
            y: 0,
            id: "5x0",
            username: "Cameron"
        },
        {
            color: "#1660D0",
            x: 10,
            y: 15,
            id: "10x15",
            username: "Jun"
        }
    ]
}

app.get('/', (req, res) => {
    res.send(pixels);
});

app.get('/pixels/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findPixelById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {pixel_list: result};
        res.send(result);
    }
});

function findPixelById(id) {
    return pixels['pixel_list'].find( (pixel) => pixel['id'] === id); // or line below
}

//pixels?username=
app.get('/pixels', (req, res) => {
    const username = req.query.username;
    if (username != undefined){
        let result = findPixelsPlacedBy(username);
        result = {pixel_list: result};
        res.send(result);
    }
    else{
        res.send(pixels);
    }
});

const findPixelsPlacedBy = (name) => { 
    return pixels['pixel_list'].filter( (pixel) => pixel['username'] === name); 
}

app.post('/pixels', (req, res) => {
    const pixelToAdd = req.body;
    addPixel(pixelToAdd);
    res.status(201).end();
});

function addPixel(pixel){
    pixels['pixel_list'].push(pixel);
}

// Clears out all pixel data
app.delete('/pixels/', (req, res) => {
    pixels['pixel_list'] = [];
    res.status(204).end();
})

app.listen(port, () => {
    console.log(`Pixlerr listening at http://localhost:${port}`);
});  
