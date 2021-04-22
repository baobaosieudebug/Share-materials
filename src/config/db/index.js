const mongoose = require("mongoose");
async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/myproject_newspage_db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("connect successfully!!!");
  } catch (error) {
    console.log("connect Failure!!!");
  }
}
module.exports = { connect };
