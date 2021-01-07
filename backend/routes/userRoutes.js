const express = require("express");
const {
  post_userData,
  get_detectionData,
  get_userData,
  delete_user,
  clear_detectionData,
} = require("../controller/userControllers");
const { uploader, upload_validatior } = require("../middleware/userMiddleware");

const router = express.Router();

router.get("/data", get_detectionData);
router.delete("/data", clear_detectionData);
router.get("/", get_userData);
router.delete("/:id", delete_user);
router.post("/", uploader, upload_validatior, post_userData);

module.exports = router;
