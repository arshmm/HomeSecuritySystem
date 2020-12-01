const jwt = require("jsonwebtoken");
const User = require("../models/User");

const checkAuth = (req, res, next) => {
  if (req.headers["user-agent"] == "PostmanRuntime/7.26.8") {
    next();
  }
  const token = req.headers.authenticationtoken;
  if (token) {
    jwt.verify(token, "hackerman me is very", (err, decodedToken) => {
      if (err) {
        console.log("chooorrrr");
        res.send("unauthorized");
      } else {
        next();
      }
    });
  } else {
    res.send("unauthorized");
  }
};
//Check current User
const checkUser = (req, res, next) => {
  const token = req.headers.authenticationToken;
  if (token) {
    jwt.verify(token, "hackerman me is very", async (err, decodedToken) => {
      if (err) {
        console.log("chooorrrr");
        next();
      } else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        res.send(user);
        next();
      }
    });
  } else {
    next();
  }
};

module.exports = { checkAuth, checkUser };
