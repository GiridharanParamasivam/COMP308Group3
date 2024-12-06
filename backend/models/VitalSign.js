const { default: mongoose } = require("mongoose");

const vitalSign = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"User"},
    temperature :Number,
    heartRate:Number,
    bloodPressure:String,
    respirationRate:Number,
    date:{type:Date,default:Date.now}

})
module.exports = mongoose.model("VitalSign",vitalSign)