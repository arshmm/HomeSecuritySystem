const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/recieve_data", (req, res) => {
  console.log(req.body);
  res.status(200).send("recieved");
});

module.exports = router;
