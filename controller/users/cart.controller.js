
const CartService = require('../../services/users/cart.service.js')
const cartService = new CartService()

// localhost:8000/api/v1/users/cart/add-cart/:cartItem
exports.addCart = async (req, res) => {
  try {
    
    if (!req.params.cartItem) {
      return res.json({ message: "select item to add cart" });
    }
    let cartFind = await cartService.getCart({ cartItem:req.params.cartItem,isDelete:false});
    if (cartFind) {
      return res.json({ message: "This product is already added to cart" });
    }
    let cartItem = await cartService.addCart({ user: req.user._id,cartItem:req.params.cartItem,quantity:req.body.quantity});
    res.json({ cart: cartItem, message: "cart item is add" });
  } catch (error) {
    console.log(error);
    res.json({ message: "Server Error" });
  }
};

// localhost:8000/api/v1/users/cart/my-cart
exports.getAllCart = async (req, res) => {
  try {
    let cartProduct = await cartService.getAllCarts({user: req.user._id,isDelete: false});
    let allCartItems = cartProduct.map((e) => ({
      _id:e._id,
      user:e.user,
      product_id: e.cartItem._id,
      productImage: e.cartItem.productImage,
      price: e.cartItem.price,
      title: e.cartItem.title,
      quantity: e.quantity,
      totalAmount: e.quantity * e.cartItem.price,
      totalSum: totalAmountSum
    }));
    const totalAmountSum = allCartItems.reduce((sum, item) => sum + item.totalAmount, 0);

    if(allCartItems.length === 0){
      return res.json({ message: "your cart was empty" });
    }
    res.json({ cartItems: allCartItems, message: "all cartItem" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

// localhost:8000/api/v1/users/cart/get-cart/:id
exports.getCart = async (req,res) =>{
  try {
   let specificCart = await cartService.getspacificCarts({ _id:req.params.id,isDelete:false})
    if(!specificCart){
        return res.json({message:"this cartitem not in cart"})
    } 
    res.json({specificCart:specificCart,message:"cart"})
  } catch (error) {
    console.log(error);
    res.json({ message: "Server Error" });
  }
}

// localhost:8000/api/v1/users/cart/update-cart/:id
exports.updateCart = async (req, res) => {
  try {
    const quantity = parseInt(req.body.quantity, 10);
    if (isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({ message: "Invalid quantity. Please provide a positive integer." });
    }
     let updateCart = await cartService.updateCart({_id:req.params.id,isDelete:false},{quantity:quantity})
     if(!updateCart){return res.json({message:"cart item not found"})} 

    res.json({ updateCart: updateCart, message: "your cart quntity updated" });
  } catch (error) {
    console.log(error);
    res.json({ message: "Server Error" });
  }
};

// localhost:8000/api/v1/users/cart/remove-cart/:id
exports.deleteCart = async (req, res) => {
  try {
       let removeCart =  await cartService.removeCart({_id:req.params.id,isDelete:false},{isDelete:true})
       if (!removeCart) {
        return res.json({ meassage: "Product not found" });
      }
    res.json({message: "your cart item was remove" });
  } catch (error) {
    console.log(error);
    res.json({ message: "Server Error" });
  }
};
