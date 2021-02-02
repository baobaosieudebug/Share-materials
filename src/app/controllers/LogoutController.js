const User = require("../Model/Users");
const { mongooseToObject } = require("../../ulti/mongoose");
const jwt = require("jsonwebtoken");
class LogoutController {
  index(req, res, next) {
    req.session.destroy(function () {
      console.log("user logged out.");
    });
    res.redirect("/login");
  }

  // checklogin(req,res,next){
  //   const emailLogin=req.body.email;
  //   const pswLogin=req.body.psw;
  //    User.findOne({email: emailLogin ,psw: pswLogin})
  // .exec(function (err, user) {
  //     if(err) { res.status(500).json(err); return; };
  //     // res.json(user)
  //     if(user.email == emailLogin && user.psw == pswLogin){
  //        // Create a token
  //        const token = jwt.sign({ email: user.email }, process.env.SECRET, {
  //         expiresIn: "60 days"
  //       });
  //       res.cookie("nToken", token, { maxAge: 900000, httpOnly: true });
  //       // res.redirect("/");
  //   res.redirect('/home',{User: mongooseToObject(user),})
  //     }
  //     else{
  //       res.render('login');
  //     }
  // });
  // }
}

module.exports = new LogoutController();
