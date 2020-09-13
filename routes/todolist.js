
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const Task = mongoose.model("Task")
const Goal = mongoose.model("Goal")
const requireLogin = require('../middleware/requirelogin')
const cors = require('cors')
router.use(cors())
router.get('/task/:id/:id2',requireLogin,(req,res)=>{
    console.log(req.params.id);
    Task.findById(req.params.id, function (err, task) {
      if(!err){
      if(!req.params.id2){
        res.json(task);
      }
      else{
        res.json(task[req.params.id2]);
      }
    }
    })
})
router.get('/getalltasks/:datenum/:monthnum/:yearnum',requireLogin,(req,res)=>{
    console.log(req.user._id);
    Task.find({belongsTo:"5ec3c4b3221e042f32ace44f",datenum:req.params.datenum},function(err, tasks) {
      if(!err){
        res.json(tasks);
        }
        else
        console.log("err",err);
    })
})
router.post("/addtask",requireLogin,(req,res)=>{
  console.log("task=>",req.body.task);
var task = new Task(req.body.task);
task.save().then((resp) => {
  console.log(resp);
  task=resp;
  User.findOneAndUpdate({_id:req.user._id},{
          $push:{todolist: task._id}
      },{new:true}).exec((err,result)=>{
          if(err){
            console.log(err);
              return res.status(422).json({error:err})
          }else{
              res.json(result)
          }
      })
});
})
router.post("/updatetask",requireLogin,(req,res)=>{
  console.log("task=>",req.body.task);
Task.findByIdAndUpdate(req.body.task._id,req.body.task,(err,task)=>{
  console.log(task);
})
})
router.get("/deletetask/:id",requireLogin,(req,res)=>{
  console.log(req.params.id);
  Task.deleteOne({_id:req.params.id },function (err, task) {
    if(!err){
      console.log(err);
    }
    else{
      console.log(task,"done");
    }
  })
})
router.get('/goal/:id/:id2',requireLogin,(req,res)=>{
    console.log(req.params.id);
    Goal.findById(req.params.id, function (err, goal) {
      if(!err){
      if(!req.params.id2){
        res.json(goal);
      }
      else{
        res.json(goal[req.params.id2]);
      }
    }
    })
})
router.post("/addgoal",requireLogin,(req,res)=>{
  console.log(req.body.goal);
var goal = new Goal(req.body.goal);
goal.save().then((resp) => {
  console.log(resp);
  goal=resp;
  User.findOneAndUpdate({_id:req.user._id},{
          $push:{goallist: goal._id}
      },{new:true}).exec((err,result)=>{
          if(err){
            console.log(err);
              return res.status(422).json({error:err})
          }else{
              console.log(result);
              res.json(result)
          }
      })
})
})
router.get("/taskcompleted/:id",requireLogin,(req,res)=>{
  console.log("req rec",req.params.id);
  Task.findByIdAndUpdate(req.params.id,{completed:true} ,function (err, task) {
    if(!err){
      console.log("taskcompleted",req.params.id,task);
    }
  })
  User.findOneAndUpdate({_id:req.user._id},{
          taskscompleted:req.user.taskscompleted+1,
          points:req.user.points+1
      },{new:true})
})

router.get("/undotaskcompleted/:id",requireLogin,(req,res)=>{
  console.log("undo req rec",req.params.id);
  Task.findByIdAndUpdate(req.params.id,{completed:false} ,function (err, task) {
    if(!err){
      console.log("taskcompleted",req.params.id,task);
    }
  })
  User.findOneAndUpdate({_id:req.user._id},{
          taskscompleted:req.user.taskscompleted-1,
          points:req.user.points-1
      },{new:true})
})
module.exports=router
