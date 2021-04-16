const mongoose = require("mongoose");
const User = require("../Model/Users");
const { mutipleMongooseToObject } = require("../../ulti/mongoose");
const { mongooseToObject } = require("../../ulti/mongoose");
const product = require("../Model/Product");
const url = require("url");
var formidable = require('formidable');
var fs = require('fs');
  
class CreateItemController {
  index(req, res) {
    if(req.session.user){
      res.render("createItem");
     }
     else{
      res.redirect("/login");
     }
  }

  store(req, res) {
 
    if(req.session.user){
    User.findOne().exec(function (err, user) {
      const sanpham = product.create({
        idUserCreated: req.session.user._id,
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description,
      });
      

      const newUser = User.create({
        product: sanpham,
      });
      res.redirect("/home");
    });

    }
    else{
    res.redirect("/login");
    }
  }

  formUpload(req,res){
    res.render("upfile");
  }

  upfile(req,res){
    //Uploadfil in public/img
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
          const path = require("path")
   
          const pathToFile = path.join(files.filetoupload.path)
          const pathToNewDestination = path.join("D:/myblog/public/images", files.filetoupload.name)
          fs.copyFile(pathToFile, pathToNewDestination, function(err) {
            if (err) {
              throw err
            } else {
              console.log("Successfully copied and moved the file!")
            }
            console.log( files.filetoupload.name)
          })
      res.redirect("/home");
    });
  }

  showProductById(req, res) {
    if(req.session.user){
      User.findOne().exec(function (err, user) {
        const idUser = user._id;
        product.find({ idUserCreated: idUser }).exec(function (err, products) {
          res.render("showDetail", {
            Product: mutipleMongooseToObject(products),
          });
        });
      });
     }
     else{
      res.redirect("/login");
     }
  }
}
module.exports = new CreateItemController();
