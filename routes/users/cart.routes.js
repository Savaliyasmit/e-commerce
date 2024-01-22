const express = require("express");
const cartRoutes = express.Router();
const {
  addCart,
  getAllCart,
  updateCart,
  deleteCart,
  getCart
} = require("../../controller/users/cart.controller.js");
const { verifytoken } = require("../../helpers/verifyToken.js");

cartRoutes.post("/add-cart/:cartItem", verifytoken, addCart);
cartRoutes.get("/my-cart", verifytoken, getAllCart);
cartRoutes.patch("/update-cart/:id", verifytoken, updateCart);
cartRoutes.delete("/remove-cart/:id", verifytoken, deleteCart);
cartRoutes.get("/get-cart/:id",verifytoken,getCart)

module.exports = cartRoutes;
