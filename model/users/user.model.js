const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  profileImage:{
       type:String
  },
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  gender:{
    type:String,
    require:true,
    enum: ["male", "female"]
  },
  role: {
    type: String,
    require: true,
    enum: ["user", "admin"]
  },
  isDelete: {
    type: Boolean,
    default: false
  },
});

module.exports = mongoose.model("users", usersSchema);
