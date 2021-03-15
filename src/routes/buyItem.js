const express = require("express");
const router = express.Router();
const buyItemController = require("../app/controllers/BuyItemController");

router.get("/", buyItemController.index);
router.get("/:slug", buyItemController.showDetailProduct);
router.get("/:slug/information", buyItemController.showDetailPersonBuyItem);
router.post("/:slug/information", buyItemController.formOrder);
router.get("/:slug/order", buyItemController.formOrder);
module.exports = router;
