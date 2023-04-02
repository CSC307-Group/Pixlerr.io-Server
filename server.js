// npx nodemon server.js

const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const session = require('cookie-session');;
const passport = require("passport");
const pixelServices = require("./models/pixel-services");
const userServices = require("./models/user-services");
const { createServer } = require("http");

const app = express();
const httpServer = createServer(app);

const PORT = process.env.PORT || 5000;
const pixelBackupInterval = 7200000; // milliseconds => 2 hours
const pixelDelay = 0; // milliseconds => 0 seconds // currently turned off to make the app easier to present



// Start up

let canvas;
let width = 40;
let height = 20
const createNewCanvas = () => {
  const newCanvas = [];
  const id = new mongoose.Types.ObjectId();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const newPixel = {
        color: "#fff",
        x: x,
        y: y,
        userId: id,
      }
      newCanvas.push(newPixel);
    }}
  pixelServices.addCanvas(newCanvas);
  return newCanvas;
};

const setupCanvas = async () => {
  const dbCanvas = await pixelServices.getPixels();
  canvas = dbCanvas.length === 0 ? createNewCanvas() : dbCanvas;
}

setupCanvas(width, height);
setInterval(async () => {
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      pixelServices.updatePixel(canvas[y + (x * height)]);
    }
  }
  console.log("Backed up canvas to database");
}, pixelBackupInterval);

// Middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL, 
    credentials: true,
    transports: ['websocket', 'polling'],
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



// Websocket pixel functions

const io = require("socket.io")(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  socket.on("connected", (setCanvas) => { // Send pixel data to client
    setCanvas(canvas);
  }); 

  socket.on("pixelUpdate", async (pixel, color, user, updateUserTime) => { // Receive updated pixel data
    if (await userValidation(user)) {
      const i = pixel.y + (pixel.x * height);
      canvas[i].color = color;
      canvas[i].userId = user._id;
      updateUserTime();
      io.emit("updateCanvas", {updatedPixel: canvas[i], index: i}); // Send updated pixel to all clients
    }
  })

  socket.on("resetCanvas", async (user, newCanvas) => { // Completely reset canvas
    const dbUser = await userServices.findUser(user.username);
    if (dbUser.userType === "admin") {
      await pixelServices.clearCanvas().then(() => {
        canvas = createNewCanvas();
        newCanvas(canvas);
      })
    }
  });
});

async function userValidation(user) {
  const dbUser = await userServices.findUser(user.username);
  if (dbUser._id === user._id) {
    if (dbUser.userType == "admin") return true;
    const compareTime = new Date(dbUser.pixelTime);
    const currentTime = new Date();
    return currentTime.getTime() - compareTime.getTime() >= pixelDelay;
  }
  return false;
}



// HTTP user Functions

app.post("/login", (req, res, next) => {
  // res.header("Access-Control-Allow-Origin", "*");
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
      });
    }
  }) (req, res, next);
});

app.post("/register", (req, res) => {
  // res.header("Access-Control-Allow-Origin", "*");
  userServices.findUser(req.body.username).then(async (user, error) => {
    if (error)
      res.status(500).end();
    if (user)
      res.send("Invalid");
    else {
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
  })
});

app.patch("/users", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  userServices.updatePixelTime(req.body.user.username, req.body.user._id).then((updatedTime, error) => {
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



// Listens using [httpServer] instead of [app] for websocket support

httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
