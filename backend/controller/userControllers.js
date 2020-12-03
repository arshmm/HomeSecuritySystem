const User = require("../models/User");
const Detections = require("../models/Detection");

//-------------------------------------------------------------
module.exports.post_userData = async (req, res) => {
  try {
    console.log("posted");
    let name = req.body.name;
    let image = req.file.path;

    const user = await new User({
      name,
      image,
    });

    const addeduser = await user.save();
    res.status(200).json(addeduser);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
//-------------------------------------------------------------
module.exports.get_userData = async (req, res) => {
  try {
    const data = await User.find();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
//-------------------------------------------------------------
module.exports.get_detectionData = async (req, res) => {
  try {
    const data = await Detections.find();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
//-------------------------------------------------------------
