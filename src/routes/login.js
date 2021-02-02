const express = require("express");
const router = express.Router();

const loginController = require("../app/controllers/LoginController.js");

router.get("/", loginController.index);
router.post("/", loginController.checklogin);
// router.post("/", loginController.checklogin);

module.exports = router;
