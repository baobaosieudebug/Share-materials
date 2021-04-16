const express = require("express");
const router = express.Router();
const createItemController = require("../app/controllers/CreateItemController.js");
router.get("/", createItemController.index);

router.post("/store", createItemController.store);
router.get("/upfile", createItemController.formUpload);
router.post("/upfile", createItemController.upfile);
router.get("/showProductById", createItemController.showProductById);

module.exports = router;
