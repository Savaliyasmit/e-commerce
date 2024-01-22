const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productImage:
    {
      type: String,
    },
  title: {
    type: String,
    require: true,
    unique: true
  },
  description: {
    type: String,
    require: true
  },
  category: {
    type: String,
    require: true,
    enum: ["chair", "table", "armchair", "bed"]
  },
  price: {
    type: Number,
    require: true,
  },
  spacialCategory:{
    type:String,
    enum:["popular"]
  },
  isDelete: {
    type: Boolean,
    default: false,
  }
});


module.exports = mongoose.model("products", productSchema);
