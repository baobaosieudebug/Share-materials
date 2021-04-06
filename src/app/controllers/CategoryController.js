const { mutipleMongooseToObject } = require("../../ulti/mongoose");
const { mongooseToObject } = require("../../ulti/mongoose");
const product = require("../Model/Product");
const user = require("../Model/Users");
const history =require("../Model/History");
const order =require("../Model/Ordered");

class CategoryController {
    index(req,res){
        res.render("cate");
    }
  showKHMT(req,res){
    user.findOne({nh: "Khoa học Máy Tính"}).exec(function (err,user) {
        product.find({idUserCreated:user.id}).exec(function(err,kq){
                res.json(kq);
        })
   })
  }
  showCNTT(req,res){
    user.find({nh: "Công Nghệ Thông Tin"}).exec(function (err,user) {
        // product.find({idUserCreated:user.id}).exec(function(err,kq){
                res.json(user.name);
        // })
   })
  }
  showMMT(req,res){
    res.send("he;llooosadasdadaasda");
  }
  showError(req,res){
    res.redirect("/buyItem");
  }


}

module.exports = new CategoryController();
