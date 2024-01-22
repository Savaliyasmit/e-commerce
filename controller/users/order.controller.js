const Cart = require("../../model/users/cart.model.js");
const OrderService = require('../../services/users/order.service.js')
const orderService = new OrderService()

//  localhost:5000/api/v1/users/order/add-order
exports.addOrder = async (req, res) => {
  try {
    const cartItems = await orderService.findCart({user: req.user._id,isDelete: false })
    if (!cartItems || cartItems.length === 0) {
      return res.json({ message: "No items found in the cart" });
    }
    let orderItems = cartItems.map((e) => ({
      cartItem: e.cartItem,
      quantity: e.quantity,
      price: e.cartItem.price
    }));
    let totalPrice = orderItems.reduce((total, item) => total + item.quantity * item.price, 0);
    
     let order = await orderService.addOrder({
      user: req.user.id,
      items: orderItems,
      totalAmount: totalPrice
    });

    await Cart.updateMany({ user: req.user._id }, { isDelete: true });
    res.json({order,message: "Order palced" });
  } catch (error) {
    console.log(error);
    res.json({ message: "Server Error" });
  }
};

// localhost:5000/api/v1/users/order/get-order/:id
exports.getOrder = async (req,res)=>{
  try {
    let spacificOrder = await orderService.getOrder({_id:req.params.id,isDelete:false})
    if(!spacificOrder){
        return res.json({message:"order not found"})
    } 
    res.json({spacificOrder,message:"your order"})
  } catch (error) {
    console.log(error);
    res.json({ message: "Server Error" });
  }
}

// localhost:5000/api/v1/users/order/my-order
exports.getAllOrder = async (req, res) => {
  try {
    let order = await orderService.getAllOrder({ user: req.user._id, isDelete: false });
    if (order.length === 0) {
      return res.json({ message: "your order was empty" });
    }
    res.json({ order,massage: "all orders found"});
  } catch (error) {
    console.log(error);
    res.json({ message: "Server Error" });
  }
};

// localhost:5000/api/v1/users/order/remove-order/:id
exports.cancelOrder = async (req, res) => {
  try {
  
    let removeOrder =  await orderService.updateOrder({_id:req.params.id,isDelete:false},{isDelete:true})
    if (!removeOrder) {
      return res.json({ message: "order not found.." });
    }
    res.json({ message: "cancel order sucessfully..." });
  } catch (error) {
    console.log(error);
    res.json({ message: "Server Error" });
  }
};
