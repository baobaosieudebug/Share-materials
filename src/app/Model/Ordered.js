const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const orderSchema = new Schema({
  idUserCreated: String,
  name: String,
  price: String,
  image: String,
 
  description:{
    type: String,
    min: 5,
    max: 150,
  },


  slug: { type: String, unique: true }, 
});
module.exports = mongoose.model("Ordered", orderSchema);
