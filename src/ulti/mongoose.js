module.exports = {
  mutipleMongooseToObject: function (mongooseArrays) {
    return mongooseArrays.map((mongooseArrays) => mongooseArrays.toObject());
  },

  mongooseToObject: function (mongoose) {
    return mongoose ? mongoose.toObject() : mongoose;
    /// Nếu có thằng mongoose sẽ  return thành Object nếu không thì return về chính nó (:mongoose)
  },
};
