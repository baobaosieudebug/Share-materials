const product = require("../Model/Product");
const user = require("../Model/Users");
const { mongooseToObject } = require("../../ulti/mongoose");
const { mutipleMongooseToObject } = require("../../ulti/mongoose");
const jwt = require("jsonwebtoken");
const history = require("../Model/History");

var formidable = require('formidable');
var fs = require('fs');

const nodemailer =  require('nodemailer');
const { isEmpty } = require("lodash");

class HomeController {
  index(req, res, next) {
    if(req.session.user){
      history.findOne({idUserCreated: req.session.user._id}).exec(function (err,notice) {
        // res.json( req.session.user._id)
            if(notice != null){
              history.find({idUserCreated: req.session.user._id}).exec(function (err,notices) {
                res.redirect("home/notice");
              }) 
            }
            else{
                if(req.session.user.mdw == "1"){
                  res.redirect("home/admin");
                }
                else{
                  res.render("home");
                }
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
  myProfileAdmin(req, res) {

    user.findOne({mdw:"1"}).exec(function (err, users) {
        res.render("myprofileAdmin", { User: mongooseToObject(users) })
     })
  }
  
  backHome(req,res){
        res.redirect("/home");
  }

  backHomeAdmin(req,res){
      res.redirect("/home/admin");
}

  showNotice(req, res) {
    if(req.session.user){
      history.find({idUserCreated: req.session.user._id}).exec(function (err,notice) {
               res.render("thongbao", { Notice: mutipleMongooseToObject (notice)});
          })
    }
  }
  store(req, res) {
    
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
          })
     //  res.write('File uploaded');
      res.end();
    });
 if(req.session.user){

   User.findOne().exec(function (err, user) {
     const sanpham = product.create({
       idUserCreated: req.session.user._id,
       name: req.body.name,
       price: req.body.price,
       image: req.body.filetoupload,
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

  deleteShowDetail(req, res, next) {
    product.deleteOne({_id: req.params.id})
     .then(() => res.redirect("back"))
    .catch(next);
  }
  
 deleteHistory(req, res, next) {
    history.deleteOne({idItem: req.params.id})
    .then(() => res.redirect("back"))
    .catch(next);
    product.findByIdAndUpdate({_id:req.params.id}, { state:"daban"},
    function (err, docs) {})
  }

  logout(req, res, next) {
    req.session.destroy(function () {
      console.log("user logged out.");
    });
    res.redirect("/login");
  }
  adminDashboard(req,res){
     user.find({mdw:"0"}).exec(function(err,users){
                  for (const position in users) {
                    var idUser = users[position]._id;
                    product.find({idUserCreated:idUser}).exec(function(err,productFinded){
                      users[position].slb = productFinded.length;
                      // users[position].save();
                    })
                    history.find({idUserBuyItem:idUser}).exec(function(err,productBuyed){
                      users[position].slm = productBuyed.length;
                      // console.log(users[position].slm)
                      users[position].save();
                       //day code ra 1 ham va lam thanh chuc nag 
                    })  
                  }
                res.render("admin",  {  User: mutipleMongooseToObject(users)});
    })
  }

  bannerUser(req, res, next) {
    user.deleteOne({_id: req.params.id})
     .then(() => res.redirect("/home/admin"))
    .catch(next);
  }

  transactioHistory(req,res,next){
    history.find().exec(function(err,transaction){
        res.render("history",  {  History: mutipleMongooseToObject(transaction)});
    })
  
  }
  deleteTransactionHistory(req,res,next){
    history.deleteOne({_id: req.params.id})
    .then(() => res.redirect("/home/admin"))
   .catch(next);
  }

  searchName(req,res,next){
    res.render("formSearchByName");
  }
  
 
  resultOfSearchByName(req,res,next){
    user.find({name:req.body.name}).exec(function(err,users){
      if(req.body.name == undefined){
        res.redirect("/home/admin")
      }
      else{
        if(users == null){
          res.redirect("/home/admin");
        }
        else{
           res.render("admin",{User:mutipleMongooseToObject(users)});
        }
      }
    })
  }

  resultTitleBook(req,res,next){
    product.find({name:req.body.name}).exec(function(err,products){
      if(isEmpty(products)){
        res.redirect("/home");
      }
      else{
        res.render("buyItem", { Product: mutipleMongooseToObject(products) });
      }
    })
  }

  formcontact(req,res){
    res.render('contactform');
  }
  contactWithEmail(req,res){
        // res.json(req.body)
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: req.body.username,
        pass: req.body.password,
      }
    
    });

    var mailOptions = {
      from: req.body.username,
      to: req.body.receive,
      subject: 'Sending Email From Share-material Website in CTU',
      text: 'Chào '+req.body.receive+' Hiện tại tôi đang có nhu cầu trao đổi tài liệu với bạn hãy vui lòng kiểm tra thôn báo email của tôi là ' + req.body.username +'.Xin Cám Ơn!!'
    };
    var checkAuth = true;
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        if(error.code == 'EAUTH'){
          checkAuth = false;
        }  
      } 
      if(checkAuth === true){
        res.redirect("/home");
      }
      else{
        res.redirect("/login");
      }
    })
 
   
   
    }

    formUpload(req,res,next){
      product
      .findById({ _id: req.params.id })
      .then((product) =>
        res.render("upfile", { Product: mongooseToObject(product) })
      )
      .catch(next);
    }
  
    upfile(req,res,next){
      // Uploadfil in public/img
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
              product
              .update({ _id: req.params.id },{$set:{image:files.filetoupload.name}})
              .then(() =>  res.redirect("/home"))
              .catch(next);
            })
        res.redirect("/home");
      });
    
    }
  

}

module.exports = new HomeController();
