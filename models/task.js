const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const taskSchema = new mongoose.Schema({
  taskName:{
      type:String,
      required:true,
      default:"Task"
  },
  taskDescription:{
      type:String
  },
  fromTime:{
    type:String
  },
  toTime:{
    type:String
  },
  timeDuration:{
    type:Number
  },
  taskTier:{
    type:Number
  },
  repeat:{
    type:String,
    required:true,
    default:"Never"
  },
  childOf:{
    type:ObjectId,
    ref:"Task"
  },
  parentOf:{
    type:ObjectId,
    ref:"Task"
  },
  date:{
    type:Date,
    required:true,
    default:new Date()
  },
  belongsTo:{
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
  },
  taskType:{
    type:String,
    required:true,
    default:"Productive"
  }
})

mongoose.model("Task",taskSchema)
module.exports = mongoose.model("Task",taskSchema);
