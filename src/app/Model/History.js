
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const historySchema = new Schema({
  idUserBuyItem: String,
  name: String,
  idUserCreated: String,
  nameUserCreated: String,
  idItem: String,
  nameUserBuyItem:String,
  email: String,
  mssv:{ type: String, unique: true }, 
  sdt: String,
  fb:String,
  nh: String,
  buyedAt: { type: Date, default: Date.now },
  slug: { type: String, slug: "name", unique: true }, 
});
module.exports = mongoose.model("History", historySchema);
