const Review = require("../../model/users/review.model");

module.exports = class ReviewService {
    getReview = async (body)=>{
        return await Review.findOne(body)
    }
    addReview = async (body)=>{
        return await Review.create(body)
    }
    getAllReview = async (data)=>{
        return await Review.find(data).populate('product')
    }
   getSpacificReview = async (id)=>{
    return await Review.findOne(id).populate('product')
   }
   reviewUpdate = async (id, body) => {
    return await Review.findOneAndUpdate(id, body,{new:true});
  }

}