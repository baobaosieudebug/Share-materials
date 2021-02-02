const User = require("../Model/Users");
const { mutipleMongooseToObject } = require("../../ulti/mongoose");
const md5   = require("blueimp-md5");

class RegisterController {
  index(req, res) {
    res.render("register");
  }
  store(req, res, next) {
    // res.json(req.body);
    // const formData = req.body;
    // // const user = new User(formData);//bien o tren la User
    // //  user.save()
    const newUser = User.create({
      name: req.body.name,
      email:req.body.email,
      mssv:req.body.mssv,
      psw:md5(req.body.psw),
      sdt:req.body.sdt,
      nh:req.body.nh,
      fb: req.body.fb
      // slug:req.body.mssv,

    })
    // newUser.save()
    .then(() => res.redirect('/login'))
    .catch(console.error())
  }
}

module.exports = new RegisterController();
