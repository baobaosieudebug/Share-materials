const product = require("../Model/Product");
const user = require("../Model/Users");
const { mongooseToObject } = require("../../ulti/mongoose");
const { mutipleMongooseToObject } = require("../../ulti/mongoose");
const jwt = require("jsonwebtoken");
const history = require("../Model/History")

class HomeController {
  index(req, res, next) {
    if(req.session.user){
      history.findOne({idUserCreated: req.session.user._id}).exec(function (err,notice) {
        // res.json( req.session.user._id)
            if(notice != null){
              history.find({idUserCreated: req.session.user._id}).exec(function (err,notices) {
                res.redirect("home/thongbao")
              }) 
            }
            else{
              res.render("home");
            }
          })
    }
    else{
      res.redirect("/login");
    }
  }

  myProfile(req, res) {
    if(req.session.user){
    user.findOne({ _id: req.session.user._id }).exec(function (err, users) {
        res.render("myprofile", { User: mongooseToObject(users) })
     })
    } 
  }

  showNotice(req, res) {
    if(req.session.user){
      history.find({idUserCreated: req.session.user._id}).exec(function (err,notice) {
               res.render("thongbao", { Notice: mutipleMongooseToObject (notice)});
          })
    }
  }

  showDetail(req, res) {
    if(req.session.user){
      product
      .find({ idUserCreated: req.session.user._id })
      .exec(function (err, products) {
        if(Object.values(products).length === 0){
          res.render("createItem");
        }
        else{
          res.render("showDetail", {
            Product: mutipleMongooseToObject(products),
          });
        }
        
      });
    }
    else{
     res.redirect("/login");
    }
    
  }

  edit(req, res, next) {
    product
      .findById({ _id: req.params.id })
      .then((product) =>
        res.render("edit", { Product: mongooseToObject(product) })
      )
      .catch(next);
  }

  //PUT /buyItem/:id
  update(req, res, next) {
    product
      .updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/home/showDetail"))
      .catch(next);
  }

  delete(req, res, next) {
    product
      .deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  logout(req, res, next) {
    req.session.destroy(function () {
      console.log("user logged out.");
    });
    res.redirect("/login");
  }
}

module.exports = new HomeController();
