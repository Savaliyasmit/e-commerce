const express = require("express");
const orderRoutes = express.Router();
const {
  addOrder,
  getAllOrder,
  cancelOrder,
  getOrder
} = require("../../controller/users/order.controller.js");
const { verifytoken } = require("../../helpers/verifyToken.js");

orderRoutes.post("/add-order", verifytoken, addOrder);
orderRoutes.get("/my-order", verifytoken, getAllOrder);
orderRoutes.delete("/remove-order/:id", verifytoken, cancelOrder);
orderRoutes.get("/get-order/:id",verifytoken,getOrder)

module.exports = orderRoutes;
