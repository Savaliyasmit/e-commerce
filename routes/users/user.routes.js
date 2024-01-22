const express = require("express");
const UserRoutes = express.Router();
const {
  signupUser,
  loginUser,
  getProfile,
  updateProfile,
  forgetPassword,
  getPopularProducts,
  getCategoryProducts,
  getSpacificProduct,
  logout,
  deleteProfile
} = require("../../controller/users/user.controller.js");
const { verifytoken } = require("../../helpers/verifyToken.js");
const { upload } = require("../../helpers/imageUplode.js");

UserRoutes.post("/signup", upload.single("profileImage"), signupUser);
UserRoutes.post("/login", loginUser);
UserRoutes.get("/logout",verifytoken,logout)
UserRoutes.get("/profile", verifytoken, getProfile);
UserRoutes.patch("/profile-update",verifytoken,upload.single("profileImage"),updateProfile);
UserRoutes.post("/reset-password", verifytoken, forgetPassword);
UserRoutes.get("/popular", getPopularProducts);
UserRoutes.get("/category/:name", getCategoryProducts);
UserRoutes.get("/product/:id",getSpacificProduct);
UserRoutes.delete("/remove-profile",verifytoken,deleteProfile)

module.exports = UserRoutes;
