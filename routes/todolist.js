
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const Task = mongoose.model("Task")
const Goal = mongoose.model("Goal")
const requireLogin = require('../middleware/requirelogin')
const cors = require('cors')
router.use(cors())
var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [new schedule.Range(0, 6)];
rule.hour = 0;
rule.minute = 1;
rule.tz = 'Asia/Kolkata';
var j = schedule.scheduleJob(rule, function(){
  const date=new Date();
  Task.updateMany({repeat:"Everyday",datesDone:{$in:[(new Date(date.getFullYear(),date.getMonth(),date.getDate()-1))]}},{completed:false,$inc:{streak:1}},function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Updated Docs : ",docs);
    }
})
const job = schedule.scheduleJob('50 * * * *', function(){
  console.log('The answer to life, the universe, and everything!');
})
Task.updateMany({repeat:"Everyday",streak:{$gt:0},datesDone:{$nin:[(new Date(date.getFullYear(),date.getMonth(),date.getDate()-1))]}},{streak:0},function (err, docs) {
  if (err){
      console.log(err)
  }
  else{
      console.log("Updated Docs : ",docs);
  }
})
Task.updateMany({repeat:"Everyday",skipped:true,datesSkipped:{$in:[(new Date(date.getFullYear(),date.getMonth(),date.getDate()-1))]}},{skipped:false},function (err, docs) {
  if (err){
      console.log(err)
  }
  else{
      console.log("Updated Docs : ",docs);
  }
})

})
var rule1 = new schedule.RecurrenceRule();
rule1.dayOfWeek = 0;
rule1.hour = 0;
rule1.minute = 1;
schedule.scheduleJob(rule1, function(){
  const date=new Date();
  Task.updateMany({repeat:"Everyday"},{$inc:{skips:2}},function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Updated Docs : ",docs);
    }
})
})
router.get('/task/:id',requireLogin,(req,res)=>{
    console.log(req.params.id);
    Task.findById(req.params.id, function (err, task) {
      console.log(task)
      if(err){
        console.log(err);
      }
      if(!err){
      if(!req.params.id2){
        console.log(task)
        res.json(task)
      }
      else{
        res.json(task[req.params.id2]);
      }
    }
    })
})
router.post('/skip/task/:id',requireLogin,(req,res)=>{
  Task.findById(req.params.id,function(err,task){
    if(task.repeat=="Everyday"&&task.skips>0&&task.skipped==false){
      Task.findByIdAndUpdate(req.params.id,{$push:{datesSkipped:req.body.date},$inc:{skips:-1},skipped:true}, function (err, task) {
        console.log(task)
        if(err){
          console.log(err)
        }
        if(!err){
        if(!req.params.id2){
          console.log(task)
          res.json(task)
        }
        else{
          res.json(task[req.params.id2])
        }
      }
      })
    }
    else if(task.repeat!="Everyday"){
      Task.findByIdAndUpdate(req.params.id,{$push:{datesSkipped:req.body.date},$inc:{skips:-1},skipped:true}, function (err, task) {
        console.log(task)
        if(err){
          console.log(err)
        }
        if(!err){
        if(!req.params.id2){
          console.log(task)
          res.json(task)
        }
        else{
          res.json(task[req.params.id2])
        }
      }
      })
    }
    else {
      res.json({error:"Task cannot be skipped"})
    }
  })
})
router.get('/getalltasks/:datenum/:monthnum/:yearnum',requireLogin,(req,res)=>{
  const date=new Date(req.params.yearnum,req.params.monthnum,req.params.datenum)
  console.log(date.getDay());
    Task.find({belongsTo:req.user._id,$or:[{repeatdays:{$in:[date.getDay()]}},{datenum:req.params.datenum,monthnum:req.params.monthnum,yearnum:req.params.yearnum}]},function(err, tasks) {
      if(!err){
        res.json(tasks)
        }
        else
        console.log("err",err)
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
  console.log(task)
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
    console.log(req.params.id)
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
  let newdate=new Date()
  Task.findByIdAndUpdate(req.params.id,{completed:true,$push:{datesDone:new Date(newdate.getFullYear(),newdate.getMonth(),newdate.getDate())}} ,function (err, task) {
    if(!err){
      console.log("taskcompleted",req.params.id,task)
    }
  })
  console.log(req.user.taskscompleted);
  User.findOneAndUpdate({_id:req.user._id},{
          taskscompleted:req.user.taskscompleted+1,
          points:req.user.points+1
      },function (err, task) {
        if(!err){
          console.log("taskcompleted")
        }
      })
})
router.get("/undotaskcompleted/:id",requireLogin,(req,res)=>{
    let newdate=new Date()
  console.log("undo",req.params.id)
  Task.findByIdAndUpdate(req.params.id,{completed:false,$pull:{datesDone:new Date(newdate.getFullYear(),newdate.getMonth(),newdate.getDate())}} ,function (err, task) {
    if(!err){
      console.log("taskcompleted",req.params.id,task)
    }
  })
  User.findOneAndUpdate({_id:req.user._id},{
          taskscompleted:req.user.taskscompleted-1,
          points:req.user.points-1
      },function (err, task) {
        if(!err){
          console.log("taskcompleted")
        }
      })
})
module.exports=router
