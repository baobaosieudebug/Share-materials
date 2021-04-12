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
router.get("/notice",homeController.showNotice);
router.delete("/notice/:id", homeController.deleteHistory);

router.get("/cntt",homeController.showNotices);


const nodemailer =  require('nodemailer');
router.get('/contact', function(req, res) {
    res.render('contact');
});
router.post('/contact', function(req, res) {
  
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'baob1807540@student.ctu.edu.vn',
      pass: '4pum!fv6'
    }
  });
  
  var mailOptions = {
    from: 'youremail@gmail.com',
    to: 'davidnguyen28042000@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  })
});

var formidable = require('formidable');
var fs = require('fs');
router.get("/upload",function(req,res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
})


router.post("/fileupload",function(req,res){
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
        const path = require("path")

        const pathToFile = path.join(files.filetoupload.path)
        const pathToNewDestination = path.join("D:/myblog/src/img", files.filetoupload.name)
        fs.copyFile(pathToFile, pathToNewDestination, function(err) {
          if (err) {
            throw err
          } else {
            console.log("Successfully copied and moved the file!")
          }
        })
    res.write('File uploaded');
    res.end();
  });

})

module.exports = router;
