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
        product.find({name:"Giáo trình Môn Thị Giác Máy Tính"}).exec(function(err,products){
          res.render  ("buyItem", { Product:mutipleMongooseToObject(products)});
        });
  }
  showCNTT(req,res){
    product.find({name:"giáo trình môn lý thuyết đồ thị"}).exec(function(err,products){
      res.render("buyItem", { Product:mutipleMongooseToObject(products)})
    });
  }
  showError(req,res){
    res.redirect("/buyItem");
  }


}

module.exports = new CategoryController();
