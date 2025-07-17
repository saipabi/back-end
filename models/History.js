const mongoose = require('mongoose');
const historySchema = new mongoose.Schema({
    userId:mongoose.Schema.Types.ObjectId,
    name:String,
    points:Number,
    date:{type:Date, Default:Date.no}
})
module.exports = mongoose.model("History",historySchema)