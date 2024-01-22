const mongoose = require('mongoose')

const connect = async()=>{
try {
   await mongoose.connect(process.env.MONGO_DB_URL);
} catch (error) {
    console.log(error);
    res.json({ message: "Server Error" });
}
}

module.exports = connect