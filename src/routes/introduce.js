const express = require("express");
const router = express.Router();

const introduceController = require("../app/controllers/IntroduceController.js");

router.get("/", introduceController.index);


module.exports = router;
