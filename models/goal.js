const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const goalSchema = new mongoose.Schema({
  goalName:{
      type:String,
      required:true,
      default:"Goal"
  },
  date:{
    type:Date,
    required:true,
    default:new Date()
  },
  belongsTo:{
    required:true,
    type:ObjectId,
    ref:"User"
  },
  datenum:{
    type:Number
  },
  monthnum:{
    type:Number
  },
  yearnum:{
    type:Number
  },
  completed:{
    type:Boolean,
    required:true,
    default:false
  }
})
mongoose.model("Goal",goalSchema)
module.exports = mongoose.model("Goal",goalSchema);
