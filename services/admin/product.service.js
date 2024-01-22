const Product = require("../../model/admin/product.model.js");

module.exports = class ProductService {
  getProduct = async (body) => {
    return await Product.findOne(body);
  };
  addProduct = async (body) => {
    return await Product.create(body);
  };
  getAllProducts = async (body) => {
    return await Product.find(body);
  };
  productUpdate = async (id, body) => {
    return await Product.findOneAndUpdate(id,body,{new:true});
  };
  
};
