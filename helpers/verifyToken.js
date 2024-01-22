const jwt = require('jsonwebtoken')
const User = require('../model/users/user.model.js')

exports.verifytoken = async (req,res,next)=>{
    try {
       
        let token = req.headers['authorization'].split(" ")[1];
        let {userId} = jwt.verify(token,process.env.SECRET_KEY);//{ userId: '65a7c477f3cffc525950d361', iat: 1705507593 } direct userId to verify
      
        req.user = await User.findById(userId)
    
        if(req.user){
            next();
        }else{
            res.json({message:"Invalid user"})
        }
    } catch (error) {
        console.log(error);
        res.json({message: 'Server Error'});
    }
}