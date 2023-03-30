// npx nodemon backend.js

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const User = require("./models/user");
const pixelServices = require("./models/pixel-services");
const userServices = require("./models/user-services");
const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./config")(passport);

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("Invalid");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        const response = {_id: user._id, username: user.username, pixelTime: user.pixelTime}
        res.send(response);
        console.log(response);
      });
    }
  }) (req, res, next);
});

app.post("/register", (req, res) => {
  console.log("post register");
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("Invalid");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = {
        username: req.body.username,
        password: hashedPassword,
        pixelTime: new Date().toISOString(),
      };
      const savedUser = await userServices.addUser(newUser);
      res.send({_id: savedUser._id, username: savedUser.username, pixelTime: savedUser.pixelTime});
    }
  });
});

app.patch("/users", async (req, res) => {
  const user = req.body;
  console.log(user["_id"]);
  const timeUpdated = await userServices.updatePixelTime(user["_id"]);
  if (timeUpdated) res.status(204).end();
  else res.status(500).end();
});

app.get("/pixels", async (req, res) => {
  try {
    const result = await pixelServices.getPixels();
    res.send({ pixelList: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server.");
  }
});

app.get("/pixels/:id", async (req, res) => {
  try {
    const id = req.params["id"];
    const result = await pixelServices.getPixelsById(id);
    res.send({ pixelList: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server.");
  }
});

app.get("/pixels/:id", async (req, res) => {
  try {
    const id = req.params["id"];
    const result = await pixelServices.getPixelsById(id);
    res.send({ pixelList: result });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server.");
  }
});

app.patch("/pixels", async (req, res) => {
  const updatedData = req.body;
  const pixelId = updatedData[0];
  const pixelColor = updatedData[1];
  const userId = updatedData[2];
  const pixelTime = updatedData[3];

  if (hasTimerCompleted(pixelTime)) {
    if (pixelServices.updatePixel(pixelId, pixelColor, userId))
      res.status(204).end();
    else res.status(500).end();
  } else res.status(500).end();
});

function hasTimerCompleted(pixelTime) {
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
  const hasCanvasBeenMade = await pixelServices.newCanvas(
    dimensions["width"],
    dimensions["height"]
  );
  if (hasCanvasBeenMade) res.status(200).end();
  else res.status(500).end();
});

app.listen(port, () => {
  console.log(`Pixlerr listening at http://localhost:${port}`);
});
