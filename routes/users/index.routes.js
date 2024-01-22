const express = require("express");
const UserRouter = express.Router();
const ProductRouter = express.Router();
const UserRoutes = require("../../routes/users/user.routes.js");
const ProductRoutes = require("../../routes/admin/product.routes.js");
const favouriteRoutes = require("../../routes/users/favourite.routes.js");
const cartRoutes = require("../../routes/users/cart.routes.js");
const orderRoutes = require("../../routes/users/order.routes.js");
const reviewRoutes = require('../../routes/users/review.routes.js')

UserRouter.use("/user", UserRoutes);
UserRouter.use("/favourite", favouriteRoutes);
UserRouter.use("/cart", cartRoutes);
UserRouter.use("/order", orderRoutes);
UserRouter.use("/review",reviewRoutes)
ProductRouter.use("/product", ProductRoutes);

module.exports = {UserRouter,ProductRouter};

