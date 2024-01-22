const User = require("../../model/users/user.model.js");
const Product = require("../../model/admin/product.model.js");
module.exports = class UserService {
  addUser = async (body) => {
    return await User.create(body);
  };
  getUser = async (body) => {
    return await User.findOne(body);
  };
  userUpdate = async (id, body) => {
    return await User.findOneAndUpdate(id, body,{new:true});
  };
  getPopularProduct = async()=>{
    return await Product.aggregate([
      {$match:{spacialCategory:"popular",isDelete: false}},
      {
          $group: {
              _id:"$spacialCategory",
               popular: {$push:{_id:"$_id",productImage:"$productImage",title:"$title",price:"$price"}}
          }
      },
      { $unwind: "$popular" }
      ])
    }
};
