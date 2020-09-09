const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const diarySchema = new mongoose.Schema({
  diaryEntry:{
      type:String,
  },
  date:{
    type:Date,
    required:true,
    default:new Date()
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
  belongsTo:{
    type:ObjectId,
    ref:"User"
  }
})
mongoose.model("Diary",diarySchema)
module.exports = mongoose.model("Diary",diarySchema);
