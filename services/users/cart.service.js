const Cart = require('../../model/users/cart.model.js')

module.exports = class CartService {
    getCart = async (body)=>{
        return await Cart.findOne(body)
    }
    addCart = async (body)=>{
        return await Cart.create(body)
    }
    updateCart = async (id, body) => {
        return await Cart.findOneAndUpdate(id,body,{new:true});
     };
    removeCart = async (id) => {
        return await Cart.findOneAndDelete(id);
      };
     getAllCarts = async(data)=>{
        return await Cart.find(data).populate('cartItem');
      }
     getspacificCarts = async(data)=>{
        return await Cart.findOne(data).populate('cartItem');
      }
     
    
}

