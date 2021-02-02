
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const historySchema = new Schema({
  idUserBuyItem: String,
  name: String,
  idUserCreated: String,
  idItem: String,
  slug: { type: String, slug: "name", unique: true }, 
});
module.exports = mongoose.model("History", historySchema);
