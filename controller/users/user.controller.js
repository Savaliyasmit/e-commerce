
const Product = require("../../model/admin/product.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserService = require('../../services/users/user.service.js')
const userService = new UserService()

// localhost:8000/api/v1/users/user/signup
exports.signupUser = async (req, res) => {
  try {
    let user = await userService.getUser({ email: req.body.email, isDelete: false });
    if (user) {
      return res.json({ meassage: "user already exists..." });
    }
     let filePath;
    if (req.file) {
      filePath = `${req.file.path.replace(/\\/g, "/")}`;
    }
    if (!filePath) {
      return res.status(400).json({ message: "Profile image is required." });
    }

    let hashPassword = await bcrypt.hash(req.body.password, 10);
    user = await userService.addUser({
      ...req.body,
      profileImage: filePath,
      password: hashPassword,
      
    });
    res.status(201).json({ user, message: "user signup sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error..");
  }
};

// localhost:8000/api/v1/users/user/login
exports.loginUser = async (req, res) => {
  try {
    let user = await userService.getUser({ email: req.body.email, isDelete: false });
    if (!user) {
      return res.json({ meassage: "user not found..." });
    }
    let checkPassword = await bcrypt.compare(req.body.password, user.password);
    if (!checkPassword) {
      return res.json({ meassage: "password is not match..." });
    }
    let payload = {
      userId: user._id,
    };
    let token = jwt.sign(payload, process.env.SECRET_KEY);
    
    res.json({ user, Token: token, message: "your login sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error..");
  }
};

// localhost:8000/api/v1/users/user/logout
exports.logout = async (req,res)=>{
  try {
    res.json({ message: "Logout successful go to localhost:8000/api/v1/users/user/login" });
   
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error..");
  }
}

// localhost:8000/api/v1/users/user/profile
exports.getProfile = async (req, res) => {
  try {
    let user = await userService.getUser({_id:req.user._id,isDelete: false});
    if (!user) {
      return res.json({ meassage: "user not found..." });
    }
    res.json({user,message:"your profile"})
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error..");
  }
};

//localhost:8000/api/v1/users/user/profile-update
exports.updateProfile = async (req, res) => {
  try {
    let filePath;
    if (req.file) {
      filePath = `${req.file.path.replace(/\\/g, "/")}`;
    }
    let userUpdate = await userService.userUpdate({_id:req.user._id,isDelete: false},
      {profileImage:filePath,...req.body})
   if(!userUpdate){
    return res.json({ meassage: "user not found..." });
   }
    res.json({user: userUpdate,massage: "your profile update sucessfully..."});
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error..");
  }
};

//localhost:8000/api/v1/users/user/reset-password
exports.forgetPassword = async (req, res) => {
  try {
    let isValidPassword = await bcrypt.compare(
      req.body.currentPassword,
      req.user.password
    );
    if (!isValidPassword) {
      return res.json({ message: "Current password is incorrect" });
    }

    if (req.body.newPassword !==  req.body.confirmPassword) {
      return res.json({ message: "Password is not matched" });
    }

    let hashPassword = await bcrypt.hash( req.body.newPassword, 10);
    let updatePassword = await userService.userUpdate({_id:req.user._id,isDelete: false},{ password: hashPassword,new: true });

    res.json({ user: updatePassword, message: "password was reset" });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error..");
  }
};

// localhost:8000/api/v1/users/user/popular
exports.getPopularProducts = async (req, res) => {
  try {
    let products = await userService.getPopularProduct()
    if(products.length === 0){
      return res.json({message:"not have any product popular"})
    }
    res.json({products,message:"popular products"});
  } catch (error) {
    console.log(error);
    res.status(500).json({ messsage: "Internal Server Error.." });
  }
};

// localhost:8000/api/v1/users/user/category/:name
exports.getCategoryProducts = async (req, res) => {
  try {
    let products = await Product.aggregate([
      {$match:{category:`${req.params.name}`,isDelete: false}},
      {
          $group: {
              _id:"$category",
              category: {$push:{_id:"$_id",productImage:"$productImage",title:"$title",price:"$price"}}
          }
      },
      { $unwind: "$category" }
      ])
      if(products.length === 0){
        return res.json({message:"this category not exists"})
      }
    res.json({products,message:"spacific category products"});
  } catch (error) {
    console.log(error);
    res.status(500).json({ messsage: "Internal Server Error.." });
  }
};

// localhost:8000/api/v1/users/user/product/:id
exports.getSpacificProduct = async (req,res) =>{
  try { 
   let products = await userService.getUser({_id:req.params.id,isDelete:false});
   if(!products){
    return res.json({message:"product not found"})
   }
  res.json({product:products,message:"your spacific product"})
  } catch (error) {
    console.log(error);
    res.status(500).json({ messsage: "Internal Server Error.." });
  }
};

// localhost:8000/api/v1/users/user/remove-profile
exports.deleteProfile = async(req,res)=>{
  try {
    let userId = await userService.userUpdate({_id:req.user._id,isDelete: false},{isDelete:true})
    if(!userId){
      return res.json({message:"your profile not found"})
    }
    res.json({message:"your profile was delete"})
  } catch (error) {
    console.log(error);
    res.status(500).json({ messsage: "Internal Server Error.." });
  }
}