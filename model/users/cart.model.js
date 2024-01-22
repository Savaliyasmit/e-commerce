const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    cartItem:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "products",
    },
    quantity:{
        require:true,
        type: Number,
        default: 1
    },
    totalAmount:Number,
    isDelete: {
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model('carts',cartSchema)