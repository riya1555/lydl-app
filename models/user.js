const mongoose = require('mongoose')
const passportLocalMongoose=require('passport-local-mongoose')
const passport= require('passport')
const findOrCreate = require('mongoose-findorcreate')
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:false,
        default:"LOL"
    },
    email:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:false
    },
    googleId:String,
    resetToken:String,
    expireToken:Date,
    pic:String,
    // default:"https://res.cloudinary.com/cnq/image/upload/v1586197723/noimage_d4ipmd.png"
  //  },
  todolist:[
      {type:ObjectId,ref:"Task"}
  ],
  goallist:[
      {type:ObjectId,ref:"Goal"}
  ],
  level:{
    type:Number,
    required:true,
    default:0
  },
  points:{
    type:Number,
    required:true,
    default:0
  },
  taskscompleted:{
    type:Number,
    required:true,
    default:0
  }
})
userSchema.plugin(passportLocalMongoose)
userSchema.plugin(findOrCreate)
mongoose.model("User",userSchema)
module.exports = mongoose.model("User",userSchema);
