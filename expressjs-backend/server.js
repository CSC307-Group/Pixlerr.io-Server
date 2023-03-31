// npx nodemon server.js

const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const pixelServices = require("./models/pixel-services");
const User = require("./models/user");
const userServices = require("./models/user-services");

const app = express();
const PORT = process.env.PORT || 5000;



// Start up

let canvas;
let width = 40;
let height = 20
const setupCanvas = async (width, height) => {
  const dbCanvas = await pixelServices.getPixels();
  const createNewCanvas = () => {
    const newCanvas = [];
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        newCanvas.push({
          color: "#fff",
          x: x,
          y: y,
          userId: "",
        });
      }}
    return newCanvas;
  };
  canvas = dbCanvas.length === 0 ? createNewCanvas() : dbCanvas;
}
setupCanvas(width, height);



// Middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL, 
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(passport.initialize());
app.use(passport.session());
require("./config")(passport);



// Pixel functions

app.get("/pixels", async (req, res) => {
  try {
    // const result = await pixelServices.getPixels();
    res.send({ pixelList: canvas });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server.");
  }
});

// app.get("/pixels/:id", async (req, res) => {
//   try {
//     const id = req.params["id"];
//     const result = await pixelServices.getPixelsById(id);
//     res.send({ pixelList: result });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("An error ocurred in the server.");
//   }
// });

app.patch("/pixels", async (req, res) => {
  const user = req.body.userData;
  const pixel = req.body.pixelData;
  const color = req.body.newColor;
  if (mongoose.Types.ObjectId.isValid(user._id)) {
    if (user.userType == "admin" || hasTimerCompleted(user.pixelTime)) {
      canvas[pixel.y + (pixel.x * height)].color = color;
      canvas[pixel.y + (pixel.x * height)].userId = user._id;
      res.status(204).end();
    }
  }
  else
    console.log("Invalid user ID: " + user._id);
  res.status(500).end();
});

function hasTimerCompleted(pixelTime) {
  return true;
  let compareTime = new Date(pixelTime);
  let currentTime = new Date();
  console.log(currentTime.getTime() - compareTime.getTime());
  return currentTime.getTime() - compareTime.getTime() >= 60000; // 1 minute
}

app.delete("/pixels", async (req, res) => {
  const hasCanvasBeenCleared = await pixelServices.clearCanvas();
  if (hasCanvasBeenCleared) res.status(204).end();
  else res.status(500).end();
});

app.post("/pixels", async (req, res) => {
  const dimensions = req.body;
  width = dimensions.width;
  height = dimensions.height;
  await setupCanvas(width, height);
  res.status(200).end();
});



// User Functions

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log(err);
      res.status(500).end();
    }
    if (!user) res.send("Invalid");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        const response = {
          _id: user._id, 
          username: user.username, 
          pixelTime: user.pixelTime, 
          type: user.userType
        }
        res.send(response);
        console.log(response);
      });
    }
  }) (req, res, next);
});

app.post("/register", (req, res) => {
  console.log("post register");
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) {
      console.log(err);
      res.status(500).end();
    }
    if (doc) res.send("Invalid");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = {
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        password: hashedPassword,
        pixelTime: new Date().toISOString(),
      };
      const savedUser = await userServices.addUser(newUser);
      res.send({
        _id: savedUser._id, 
        username: savedUser.username, 
        pixelTime: savedUser.pixelTime,
        type: savedUser.userType
      });
    }
  });
});

app.patch("/users", async (req, res) => {
  userServices.updatePixelTime(req.body.user.username, req.body.user.id).then((updatedTime, error) => {
    if (error)
      res.send(req.body.user).end();
    res.send({
      _id: req.body.user._id, 
      username: req.body.user.username, 
      pixelTime: updatedTime,
      type: req.body.user.type
    }).end();
  })
});



// Listen

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
