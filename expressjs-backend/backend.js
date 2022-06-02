
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
const pixelServices = require('./models/pixel-services');
const userServices = require('./models/user-services');
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

// Routes
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
});

app.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = {
        username: req.body.username,
        password: hashedPassword,
      };
      await userServices.addUser(newUser);
      res.send("User Created");
    }
  });
});
app.get("/users", (req, res) => {
  res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});


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

app.patch("/pixels", async (req, res) => {
	const updatedData = req.body;
	const hasPixelUpdated = await pixelServices.updatePixel(updatedData[0], updatedData[1]);
	if (hasPixelUpdated)
		res.status(204).end();
	else
		res.status(500).end();
});

app.delete("/pixels", async (req, res) => {
    const hasCanvasBeenCleared = await pixelServices.clearCanvas();
    if (hasCanvasBeenCleared)
        res.status(204).end();
    else
        res.status(500).end();
})

app.post("/pixels", async (req, res) => {
    const dimensions = req.body;
    const hasCanvasBeenMade = await pixelServices.newCanvas(dimensions['width'], dimensions['height']);
    if (hasCanvasBeenMade)
        res.status(200).end();
    else
        res.status(500).end();
});

// app.get("/users", async (req, res) => {
//   const username = req.query["username"];
//   const password = req.query["password"];
//   const user_email = req.query["user_email"];
//   try {
//     const result = await userServices.getUsers(username, password, user_email);
//     res.send({ userList: result });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("An error ocurred in the server.");
//   }
// });

app.get('/users/:id', async (req, res) => {
  const id = req.params['id'];
  const result = await userServices.findUserById(id);
  if (result === undefined || result === null)
    res.status(404).send('Resource not found.');
  else {
    res.send({ userList: result });
  }
});

// app.post('/users', async (req, res) => {
//   const user = req.body;
//   const savedUser = await userServices.addUser(user);
//   if (savedUser)
//     res.status(201).send(savedUser);
//   else
//     res.status(500).end();
// });

app.delete("/users/:id", async (req, res) => {
  const id = req.params["id"];
  const result = await userServices.removeUser(id);
  //  console.log(result);
  if (result === undefined || result === null) {
    res.status(404).send("Resource not found.");
  }
  else {
    res.status(204).send();
  }
});

app.listen(port, () => {
  console.log(`Pixlerr listening at http://localhost:${port}`);
});
