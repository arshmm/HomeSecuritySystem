const User = require("../models/User");
const fs = require("fs");
const Detections = require("../models/Detection");

//-------------------------------------------------------------
module.exports.post_userData = async (req, res) => {
  try {
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
    fs;
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
//-------------------------------------------------------------
module.exports.delete_user = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findOneAndDelete({ _id: id });
    const path = "./" + data.image;
    fs.unlinkSync(path);
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
module.exports.clear_detectionData = async (req, res) => {
  try {
    const data = await Detections.deleteMany({});
    fs.readdir("./unknown_images", (err, file) => {
      fs.unlinkSync(`./unknown_images/${file}`);
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
//-------------------------------------------------------------
