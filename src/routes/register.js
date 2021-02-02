const express = require("express");
const router = express.Router();

const registerController = require("../app/controllers/RegisterController.js");
router.get("/", registerController.index);
router.post("/store", registerController.store);
// router.post("/", registerController.store);

module.exports = router;
