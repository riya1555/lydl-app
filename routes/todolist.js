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

/*
import { zonedTimeToUtc } from 'date-fns-tz'

const date = getDatePickerValue() // e.g. 2014-06-25 10:00:00 (picked in any time zone)
const timeZone = getTimeZoneValue() // e.g. America/Los_Angeles

const utcDate = zonedTimeToUtc(date, timeZone) // In June 10am in Los Angeles is 5pm UTC

postToServer(utcDate.toISOString(), timeZone) // post 2014-06-25T17:00:00.000Z, America/Los_Angeles
*/



/*

Task.updateOne({_id:"6035fe8489c2bd978897aab0"},[{$set:{skipsperweek:9}}],function (err, docs) {
  if (err){
      console.log(err)
  }
  else{
      console.log("Updated Docs : ",docs);
  }
})
Task.updateMany({_id:"6035fe8489c2bd978897aab0"},[{$set:{skips:"$skipsperweek"}}],function (err, docs) {
  if (err){
      console.log(err)
  }
  else{
      console.log("Updated Docs : ",docs);
  }
})
Task.findById("6035fe8489c2bd978897aab0",function(err,task){
  console.log(task);
})

*/






var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [new schedule.Range(0, 6)];
rule.hour = 1;
rule.minute = 20;
rule.tz = 'Asia/Kolkata';

/*
const date=new Date();
console.log(date);
date.setHours(date.getHours()+5);
date.setMinutes(date.getMinutes()+30);
console.log(date);
const dateyesterday=(new Date(date.getFullYear(),date.getMonth(),date.getDate()-1))

*/

// const date=new Date();
// console.log(date);
// date.setHours(date.getHours()+5);
// date.setMinutes(date.getMinutes()+30);
// console.log(date.getDate());
// const dateyesterday=date
// dateyesterday.setUTCHours(0)
// dateyesterday.setUTCMinutes(0)
// dateyesterday.setUTCSeconds(0)
// dateyesterdayy=[dateyesterday.getDate(),dateyesterday.getMonth(),dateyesterday.getFullYear()]
// console.log(dateyesterdayy);
// Task.find({repeat:"Everyday",datesDone:{$in:[dateyesterdayy]}},function (err, docs) {
//   if (err){
//       console.log(err)
//   }
//   else{
//       console.log("Updated Docs : ",docs);
//   }
// })







var j = schedule.scheduleJob(rule, function(){
  const date=new Date();
  console.log(date);
  date.setHours(date.getHours()+5);
  date.setMinutes(date.getMinutes()+30);
  console.log(date.getDate());
  const dateyesterday=(new Date(date.getFullYear(),date.getMonth(),date.getDate()-1))
  console.log(dateyesterday);
  dateyesterday.setUTCHours(0)
  dateyesterday.setUTCMinutes(0)
  dateyesterday.setUTCSeconds(0)
  const dateyesterdayy=[dateyesterday.getDate(),dateyesterday.getMonth(),dateyesterday.getFullYear()]

  Task.updateMany({repeat:"Everyday",datesDone:{$in:[dateyesterdayy]}},{completed:false,$inc:{streak:1}},{multi: true},function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Updated Docs : ",docs);
    }
})

Task.updateMany({repeat:"Everyday",streak:{$gt:0},datesDone:{$nin:[dateyesterdayy]}},{streak:0},function (err, docs) {
  if (err){
      console.log(err)
  }
  else{
      console.log("Updated Docs : ",docs);
  }
})
Task.updateMany({repeat:"Everyday",skipped:true,datesSkipped:{$in:[dateyesterdayy]}},{skipped:false},{multi: true},function (err, docs) {
  if (err){
      console.log(err)
  }
  else{
      console.log("Updated Docs : ",docs);
  }
})
User.find({},function(err,users){
  users.forEach((user)=>{
    Task.find({belongsTo:user._id,$or:[{repeatdays:{$in:[date.getDay()]}},{datenum:dateyesterday.getDate(),monthnum:dateyesterday.getMonth(),yearnum:dateyesterday.getFullYear()}]},function(err, tasks) {
      if (!err) {
        if (tasks.length > 3) {
          tasks.forEach((item, i) => {
            if (item.datesDone[item.datesDone.length-1]==dateyesterday||item.datesSkipped[item.datesSkipped.length-1]==dateyesterday) {
              User.findOneAndUpdate(user, {
                $inc: {
                  level: 1
                }
              }, function(err, n) {
                console.log(err, n);
              })
            }
          })
        }
        }
        else
        console.log("err",err)
    })
  })
})
})

/*
User.updateMany({email:"jayantchaudharyextra@gmail.com"}, {
  $inc: {
    level: 1
  }
}, function(err, n) {
  console.log(err, n);
})
User.find({email:"jayantchaudharyextra@gmail.com"}, function(err, n) {
  console.log(err, n);
})
*/


/*
var rulex=new schedule.RecurrenceRule();
rulex.minute=33;
rulex.tz= 'Asia/Calcutta';
const job = schedule.scheduleJob(rulex, function(){
  console.log('The answer to life, the universe, and everything!');
})
*/


var rule1 = new schedule.RecurrenceRule();
rule1.dayOfWeek = 0;
rule1.hour = 0;
rule1.minute = 1;
rule1.tz = 'Asia/Kolkata';
schedule.scheduleJob(rule1, function(){
  /*
  const date=new Date();
  console.log(date);
  date.setHours(date.getHours()+5);
  date.setMinutes(date.getMinutes()+30);  */



  Task.updateMany({repeat:"Everyday"},[{$set:{skips:"$skipsperweek"}}],function (err, docs) {
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
  console.log(date.getDay())
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
router.post("/taskcompleted",requireLogin,(req,res)=>{
  console.log(req.body);
  const newdate=new Date(req.body.date)
  /*

  console.log(newdate)
  newdate.setHours(newdate.getHours()+5)
  newdate.setMinutes(newdate.getMinutes()+30)
  */
  newdate.setUTCSeconds(0)
  newdate.setUTCMinutes(0)
  newdate.setUTCHours(0)
console.log(newdate);
  console.log(newdate);
  Task.findByIdAndUpdate(req.body._id,{completed:true,$push:{datesDone:[newdate.getDate(),newdate.getMonth(),newdate.getFullYear()]}} ,function (err, task) {
    if(!err){
      console.log("taskcompleted",req.body._id,task)
    }
  })
  console.log(req.user.taskscompleted)
  User.findOneAndUpdate({_id:req.user._id},{
          taskscompleted:req.user.taskscompleted+1,
          points:req.user.points+1
      },function (err, task) {
        if(!err){
          console.log("taskcompleted")
        }
      })
})
router.post("/undotaskcompleted",requireLogin,(req,res)=>{
  console.log(req.body)
  const newdate=new Date(req.body.date)
  console.log(newdate)
  /*

  newdate.setHours(newdate.getHours()+5)
  newdate.setMinutes(newdate.getMinutes()+30)
  console.log(newdate);
  */
  newdate.setUTCSeconds(0)
  newdate.setUTCMinutes(0)
  newdate.setUTCHours(0)
  console.log("undo",req.body._id)
  Task.findByIdAndUpdate(req.body._id,{completed:false,$pull:{datesDone:[newdate.getDate(),newdate.getMonth(),newdate.getFullYear()]}} ,function (err, task) {
    if(!err){
      console.log("taskcompleted",req.params._id,task)
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
