const mongoose = require("mongoose");

const DetectionSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  time: {
    type: String,
  },
});

const Detection = mongoose.model("Detection", DetectionSchema);

module.exports = Detection;
