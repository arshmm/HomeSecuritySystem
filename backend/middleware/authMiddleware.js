const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const checkAuth = (req, res, next) => {
  if (req.headers["user-agent"] == "PostmanRuntime/7.26.8") {
    next();
  }
  const token = req.headers.authenticationtoken;
  if (token) {
    jwt.verify(token, "hackerman me is very", (err, decodedToken) => {
      if (err) {
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
const checkAdmin = (req, res, next) => {
  const token = req.headers.authenticationToken;
  if (token) {
    jwt.verify(token, "hackerman me is very", async (err, decodedToken) => {
      if (err) {
        next();
      } else {
        let admin = await Admin.findById(decodedToken.id);
        res.send(admin);
        next();
      }
    });
  } else {
    next();
  }
};

module.exports = { checkAuth, checkAdmin };
