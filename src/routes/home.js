const express = require("express");
const router = express.Router();

const homeController = require("../app/controllers/HomeController.js");
const createItemController = require("../app/controllers/CreateItemController.js");

router.get("/", homeController.index);
router.post("/search/resultByName", homeController.resultTitleBook);
router.get("/admin", homeController.adminDashboard);
router.post("/admin", homeController.resultOfSearchByName);
router.delete("/admin/:id", homeController.bannerUser);
router.delete("/history/:id", homeController.deleteTransactionHistory);
router.get("/admin/myprofileAD", homeController.myProfileAdmin);
router.post("/admin/myprofileAD", homeController.backHomeAdmin);
router.get("/admin/searchName", homeController.searchName);
router.post("/admin/search/resultByName", homeController.resultOfSearchByName);
router.get("/history", homeController.transactioHistory);
router.post("/history", homeController.resultOfSearchByName);
router.post("/history/search/resultByName", homeController.resultOfSearchByName);
router.delete("/history/:id", homeController.deleteTransactionHistory);
router.get("/showDetail", homeController.showDetail);
router.get("/myprofile", homeController.myProfile);
router.post("/myprofile", homeController.backHome);
router.get("/:id/edit", homeController.edit);
router.put("/:id", homeController.update);
router.delete("/:id", homeController.deleteShowDetail);
router.get("/logout",homeController.logout);
router.post("/createItem/store", createItemController.store);
router.get("/thongbao",homeController.showNotice);
router.delete("/thongbao/:id", homeController.deleteHistory);

router.get("/cntt",homeController.showNotices);

module.exports = router;
