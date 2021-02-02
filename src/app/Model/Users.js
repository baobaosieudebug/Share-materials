const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const User = new Schema({
  name:String,
  email: String,
  mssv:{ type: String, unique: true }, 
  psw: String,
  sdt: String,
  fb:String,
  nh: String,
  slug: { type: String, slug: "mssv", unique: true }, //unique được thêm vào để tránh trường hợp bị trùng slug khi name trùng nhau.Nó sẽ thêm cái đuôi trong thư viện shortId(index.js/slug-generator) vào cái slug của name thêm vào sau
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  product: [],
});
module.exports = mongoose.model("Users", User);
