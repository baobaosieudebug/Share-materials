const mongoose = require("mongoose");
const User = require("../Model/Users");
const { mutipleMongooseToObject } = require("../../ulti/mongoose");
const product = require("../Model/Product");
const url = require("url");

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
    // res.json(req.session.user._id)
  
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
