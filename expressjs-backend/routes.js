const router = require("express").Router();
const passport = require("passport");

const CLIENT_URL = "http://localhost:3000/";

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(CLIENT_URL);
  });

module.exports = router
  