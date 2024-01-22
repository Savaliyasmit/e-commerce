const express = require('express')
const reviewRoutes = express.Router()
const {addReview,getAllReview,deleteReview,updateReview,getReview} = require('../../controller/users/review.controller.js')
const {verifytoken} = require('../../helpers/verifyToken.js')

reviewRoutes.post('/add-review/:id',verifytoken,addReview);
reviewRoutes.get('/reviews',verifytoken,getAllReview);
reviewRoutes.delete('/remove-review/:id',verifytoken,deleteReview);
reviewRoutes.patch('/update-review/:id',verifytoken,updateReview);
reviewRoutes.get('/get-review/:id',verifytoken,getReview);


module.exports = reviewRoutes