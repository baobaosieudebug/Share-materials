const express = require("express");
const router = express.Router();

const categoryController = require("../app/controllers/CategoryController.js");

 router.get("/cntt",categoryController.showCNTT);
router.get("/khmt",categoryController.showKHMT);
router.get("/mmt",categoryController.showMMT);
router.get("/ktpm",categoryController.showError);
router.get("/httt",categoryController.showError);
router.get("/kt",categoryController.showError);
router.get("/nn",categoryController.showError);
router.get("/shud",categoryController.showError);
router.get("/cn",categoryController.showError);
router.get("/ct",categoryController.showError);

router.get("/",categoryController.index);



module.exports = router;
