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
    type:Date
  },
  toTime:{
    type:Date
  },
  timeDuration:{
    type:Date
  },
  taskTier:{
    type:Number
  },
  repeat:{
    type:String,
    required:true,
    default:"Never"
  },
  repeatdays:[{
    type:Number
  }],
  //Everyday, Yes, Never
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
  skipped:{
    type:Boolean,
    required:true,
    default:false
  },
  taskType:{
    type:String,
    required:true,
    default:"Productive"
  },
  streak:{
    type:Number,
    default:0
  },
  taskScore:{
    type:Number,
    default:0
  },
  datesDone:[
      [{type:Number}]
      ],
  active:{
    type:Boolean
  },
  datesSkipped:[{
    type:Date
  }],
  datesNotDone:{
    type:Date
  },
  skipsperweek:{
    type:Number,
    default:0
  },
  skips:{
    type:Number,
    default:2
  }
})
mongoose.model("Task",taskSchema)
module.exports = mongoose.model("Task",taskSchema);
