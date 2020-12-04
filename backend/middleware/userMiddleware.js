const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    console.log("inside uploader");
    cb(null, "./Images/");
  },
  filename: function (req, file, cb) {
    cb(null, `${req.body.name}${path.extname(file.originalname)}`);
  },
});

let upload = multer({
  storage: storage,
});
const uploader = upload.single("userImage");
//--------------------------------------------------------------------------------------------
const upload_validatior = (req, res, next) => {
  if (typeof req.file === "undefined" || typeof req.body === "undefined") {
    return res
      .status(400)
      .json({ error: "Problem with thew file or the name" });
  }
  let name = req.body.name;
  let image = req.file.path;
  if (
    !req.file.mimetype.includes("jpg") &&
    !req.file.mimetype.includes("png") &&
    !req.file.mimetype.includes("jpeg")
  ) {
    fs.unlinkSync(image);
    return res.status(400).json({ error: "File not supported" });
  }
  if (req.file.size > 1024 * 1024 * 3) {
    fs.unlinkSync(image);
    return res.status(400).json({ error: "thoda phit phit h" });
  }
  if (!name || !image) {
    return res.status(400).json({ error: "aaisa adha adha na chale" });
  }
  next();
};
//--------------------------------------------------------------------------------------------

module.exports = { uploader, upload_validatior };
