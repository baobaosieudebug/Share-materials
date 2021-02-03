const User = require("../Model/Users");
const history = require("../Model/History")
const { mongooseToObject } = require("../../ulti/mongoose");
const { mutipleMongooseToObject } = require("../../ulti/mongoose");
const jwt = require("jsonwebtoken");
const md5   = require("blueimp-md5");
class LoginController {
  index(req, res, next) {
    res.render("login");
  }

  checklogin(req, res) {
    
    if (!req.body.email || !md5(req.body.psw)) {
      res.render("login", { message: "Please enter both id and password" });
    } else {
      User.findOne({ email: req.body.email, psw: md5(req.body.psw) }).exec(function (err,user) {
        if( req.session.user = user){
              res.redirect("/home");    
        }
        else{
          res.render("login")
        }
      }); 
    }
  }
  
}

module.exports = new LoginController();
