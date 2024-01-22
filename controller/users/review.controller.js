
const ReviewService = require('../../services/users/review.service.js')
const reviewService = new ReviewService()

// localhost:8000/api/v1/users/review/add-review/:id
exports.addReview = async (req,res) =>{
    try {
         if(!req.params.id){
            return res.json({message:"select product to give review"})
         }
         let foundReview = await reviewService.getReview({product:req.params.id,isDelete: false})
         if(foundReview){
           return res.json({message:"your already give review"})
         }
         let createReview = await reviewService.addReview({ user:req.user._id,product:req.params.id,
               review:req.body.review
         })
         res.json({newReview:createReview,message:"show review in my-reviews"})
    } catch (error) {
        console.log(error);
    res.json({ message: "Server Error" });
    }
}

// localhost:8000/api/v1/users/review/reviews
exports.getAllReview = async (req,res)=>{
    try {
        let review = await reviewService.getAllReview({user: req.user._id,isDelete: false})
        if (!review || review.length === 0) {
            return res.json({ message: "my reviews empty..." });
          }
           
        let userReviews = review.map((e) =>({
            _id:e._id,
            user: req.user._id,
            product_id:e.product._id,
            productImage:e.product.productImage,
            title:e.product.title,
            price:e.product.price,
            review:e.review,
            createdAt:e.createdAt,
            updatedAt:e.updatedAt
        
         }))
        res.json({ userReviews, message: "All reviews you have sent" });

    } catch (error) {
        console.log(error);
    res.json({ message: "Server Error" });
    }
}

// localhost:8000/api/v1/users/review/get-review/:id
exports.getReview = async (req,res) =>{
    try {
   
        let spacificReview = await reviewService.getSpacificReview({_id:req.params.id,isDelete: false})
        if(!spacificReview){
            return res.json({message:"review not found"})
        } 
        res.json({spacificReview,message:"product review"})
    } catch (error) {
        console.log(error);
        res.json({ message: "Server Error" });
    }
}

// localhost:8000/api/v1/users/review/update-review/:id
exports.updateReview = async (req,res) =>{
    try{
    let updateReview = await reviewService.reviewUpdate({_id:req.params.id,isDelete:false},{review:req.body.review});
    if(updateReview === null){
        return res.json({message:"review not found.."})
    }
      res.json({updateReview,message: "update review sucessfully..." });
    }catch (error) {
        console.log(error);
    res.json({ message: "Server Error" });
    }
}

// localhost:8000/api/v1/users/review/remove-review/:id
exports.deleteReview = async (req,res) =>{
    try{
         let removeReview = await reviewService.reviewUpdate({_id:req.params.id,isDelete:false},{isDelete:true})
         if( !removeReview){
            return res.json({message:"review not found ..."})
        }
         res.json({ message: "delete review sucessfully..." });
         
    }catch (error) {
        console.log(error);
    res.json({ message: "Server Error" });
    }
}
