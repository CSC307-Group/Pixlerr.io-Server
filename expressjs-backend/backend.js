const cors = require("cors");
const express = require("express");
const app = express();
const port = 5000;

// $export DEBUG='express:router'
// $npm run dev   =    $nodemon backend.js
// $npm start     =    $node backend.js

app.use(cors());
app.use(express.json());
app.listen(process.env.PORT || port, () => {
  console.log("REST API is listening.");
});
const HEIGHT = 20;
const WIDTH = 40;

const pixels = { pixelList: initializeList(HEIGHT, WIDTH) };
function initializeList(height, width) {
  l = [];
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      l.push({
        color: "#fff",
        x: x,
        y: y,
      });
    }
  }
  return l;
}

app.get("/pixels/", (req, res) => {
  res.send(pixels);
});

app.get("/pixels/:id", (req, res) => {
  const id = req.params["id"];
  let result = findPixelById(id);
  if (result === undefined || result.length == 0)
    res.status(404).send("Resource not found.");
  else {
    result = { pixelList: result };
    res.send(result);
  }
});

function findPixelById(id) {
  return pixels["pixelList"].find((pixel) => pixel["id"] === id);
}

//pixels?username=
app.get("/pixels", (req, res) => {
  const username = req.query.username;
  if (username != undefined) {
    let result = findPixelsPlacedBy(username);
    result = { pixelList: result };
    res.send(result);
  } else {
    res.send(pixels);
  }
});

const findPixelsPlacedBy = (name) => {
  return pixels["pixelList"].filter((pixel) => pixel["username"] === name);
};

app.post("/pixels", (req, res) => {
  const p = req.body;
  let index = pixels["pixelList"].findIndex(
    (pixel) => pixel["x"] === p["x"] && pixel["y"] === p["y"]
  );
  pixels["pixelList"][index]["color"] = p["color"];

  res.status(201).end();
});

// Clears out all pixel data
app.delete("/pixels/", (req, res) => {
  pixels["pixelList"] = initializeList(HEIGHT, WIDTH);
  res.status(204).end();
});

app.listen(port, () => {
  console.log(`Pixlerr listening at http://localhost:${port}`);
});
