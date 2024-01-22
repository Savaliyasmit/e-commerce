const Cart = require("../../model/users/cart.model.js");
const Order = require("../../model/users/order.model.js");

 
module.exports = class OrderService {
    findCart = async(body)=>{
        return await Cart.find(body).populate("cartItem");
    }
    addOrder = async(body)=>{
        return await Order.create(body)
    }
    getOrder = async(id)=>{
        return await Order.findOne(id)
    }
    getAllOrder = async(body)=>{
        return await Order.find(body)
    }
    updateOrder = async (id, body) => {
        return await Order.findOneAndUpdate(id,body,{new:true});
      };
}