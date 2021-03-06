const express = require("express");
const router = express.Router();

const homeController = require("../app/controllers/HomeController.js");
const createItemController = require("../app/controllers/CreateItemController.js");
const fileUpload = require("express-fileupload");

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
router.get("/notice",homeController.showNotice);
router.delete("/notice/:id", homeController.deleteHistory);
router.get("/contact",homeController.formcontact);
router.post('/contact',homeController.contactWithEmail);
router.get("/:id/upfile", homeController.formUpload);
router.put("/upfile/:id", homeController.upfile);

module.exports = router;
