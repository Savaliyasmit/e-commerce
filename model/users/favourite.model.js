const mongoose = require('mongoose')

const favouriteSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
       
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "products",
        
    },
    isDelete: {
        type: Boolean,
        default: false,
      }
})

module.exports = mongoose.model('favourite',favouriteSchema)



