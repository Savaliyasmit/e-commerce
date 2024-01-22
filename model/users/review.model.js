const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema(
{
user:{
    type: mongoose.Types.ObjectId,
  
},
product:{
    type:mongoose.Types.ObjectId,
    ref:'products'
},
review:{
    type:String
},
isDelete: {
  type: Boolean,
  default: false
}
},
  {
    timestamps: true
  })

module.exports = mongoose.model('reviews',reviewSchema)