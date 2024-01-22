const express = require('express')
const ProductRoutes = express.Router()
const {addProduct,deleteProduct,updateProduct,getAllProduct, getSpacificProduct}= require('../../controller/admin/product.controller.js')
const {verifytoken} = require('../../helpers/verifyToken.js')
const {upload}= require('../../helpers/imageUplode.js')

ProductRoutes.post('/add-product',verifytoken,upload.single('productImage'),addProduct);
ProductRoutes.get('/get-product/:id',verifytoken,getSpacificProduct)
ProductRoutes.patch('/update-product/:id',verifytoken,updateProduct);
ProductRoutes.delete('/remove-product/:id',verifytoken,deleteProduct)
ProductRoutes.get('/products',verifytoken,getAllProduct)

module.exports = ProductRoutes