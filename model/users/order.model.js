const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "users" 
},
items: [
    {
      cartItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
      quantity: {
        type: Number,
        default: 1,
      }
    }],
totalAmount: Number,
status:{
 type:String,
 default:"pending",
 enum:["pending","dispatch","comleted","rejected"]
},
  isDelete: {
    type: Boolean,
    default: false,
  }
},
{
    timestamps: true
})

module.exports = mongoose.model('orders',orderSchema)

