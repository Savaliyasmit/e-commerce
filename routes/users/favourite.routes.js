const express = require("express");
const favouriteRoutes = express.Router();
const {
  addFavourite,
  getFavouriteList,
  deleteFavouriteProduct
} = require("../../controller/users/favourite.controller.js");
const { verifytoken } = require("../../helpers/verifyToken.js");

favouriteRoutes.post("/add-favourite/:productId", verifytoken, addFavourite);
favouriteRoutes.get("/favourites", verifytoken, getFavouriteList);
favouriteRoutes.delete("/remove-favourite/:id", verifytoken,deleteFavouriteProduct);

module.exports = favouriteRoutes;
