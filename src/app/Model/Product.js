const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const productSchema = new Schema({
  idUserCreated: String,
  name: String,
  price: String,
  image: String,
  state: {type: String,default:"sansang"},
  description:{
    type: String,
    min: 5,
    max: 150,
  },

  slug: { type: String, slug: "name", unique: true }, 
});
module.exports = mongoose.model("Product", productSchema);
