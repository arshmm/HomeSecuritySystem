const express = require("express");
const Detection = require("../models/Detection");

const router = express.Router();

router.get("/data", async (req, res) => {
  const data = await Detection.find();
  res.status(200).json(data);
});

module.exports = router;
