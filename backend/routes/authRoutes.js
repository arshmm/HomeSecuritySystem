const express = require("express");
const authController = require("../controller/authControllers");
const router = express.Router();

router.post("/signup", authController.signup_post);
router.post("/login", authController.login_post);
router.get("/logout", authController.logout_get);

module.exports = router;
