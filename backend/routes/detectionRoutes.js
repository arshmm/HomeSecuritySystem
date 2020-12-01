const express = require("express");
const Detection = require("../models/Detection");

const router = express.Router();

router.post("/recieve_data", async (req, res) => {
  const time = req.body.hour + " " + req.body.date;
  const data = { name: req.body.name, time };
  try {
    if (data.name.includes("unknown")) {
      const detection = await Detection.create(data);
    } else {
      let detection = await Detection.findOne({ name: data.name });
      if (detection) {
        detection = await Detection.findOneAndUpdate(
          { name: data.name },
          { time: data.time }
        );
      } else {
        detection = await Detection.create(data);
      }
    }
    console.log("avi gayu");
    res.status(200).send("recieved");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
