const express = require("express");
const {
  post_userData,
  get_detectionData,
  get_userData,
} = require("../controller/userControllers");
const { uploader, upload_validatior } = require("../middleware/userMiddleware");

const router = express.Router();

router.get("/data", get_detectionData);
router.get("/", get_userData);
router.post("/", uploader, upload_validatior, post_userData);

module.exports = router;
