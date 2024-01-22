
const ProductService = require('../../services/admin/product.service.js')
const productService = new ProductService()

// localhost:8000/api/v1/admin/product/add-product
exports.addProduct = async (req,res)=> {
    try{
   let product = await productService.getProduct({title:req.body.title,isDelete:false});
   if(product){
    return res.json({message:"product alredy exists.."})
   }
   let filePath  
   if(req.file){
     filePath = `${req.file.path.replace(/\\/g,'/')}`
 }
 let newProduct= await productService.addProduct({
    productImage:filePath,
    ...req.body
 })
  res.json({newProduct,message:"add product sucessfully.."})
}catch (error) {
  console.log(error);
  res.status(500).json("Internal Server Error..");
}
}

//localhost:8000/api/v1/admin/product/products
exports.getAllProduct = async (req,res) =>{
  try {
    let products = await productService.getAllProducts({isDelete: false });
    if (!products) {
      return res.json({message:"products not found"})
    }
    res.json({products,message:"all products"});
  } catch (error) {
    console.log(error);
    res.status(500).json({ messsage: "Internal Server Error.." });
  }
};

// localhost:8000/api/v1/admin/product/get-product/:id
exports.getSpacificProduct = async (req,res)=>{
  try {
    let mongoId = await productService.getProduct({_id:req.params.id,isDelete:false})
    if (!mongoId) {
      return res.json({message:"products not found"})
    }
    return res.json({mongoId,message:"spacific item"})
  } catch (error) {
    
  }
}
// localhost:8000/api/v1/admin/product/update-product/:id
exports.updateProduct = async (req, res) => {
  try {
    let  product = await productService.productUpdate({_id:req.params.id,isDelete:false},{...req.body})
    if(!product){
      return res.json({message:"product not found"})
    }
    res.json({ updatedata: product,meassage: "Product is updated..."});
  } catch (error) {
    console.log(error);
    res.status(500).json({ messsage: "Internal Server Error.." });
  }
};

// localhost:8000/api/v1/admin/product/remove-product/:id
exports.deleteProduct = async (req,res) =>{
  try {
   
    let product =  await productService.productUpdate({_id:req.params.id,isDelete:false},{isDelete:true})
    if (!product) {
      return res.json({ meassage: "Product not found" });
    }
    res.json({meassage: "product delete sucessfully..."});
  } catch (error) {
    console.log(error);
    res.status(500).json({ messsage: "Internal Server Error.." });
  }
}
