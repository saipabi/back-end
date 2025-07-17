const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name : String,
    totalPoints:{type:Number,defult:0}
})
module.exports=mongoose.model("User", userSchema)