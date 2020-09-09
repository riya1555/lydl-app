const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const Task = mongoose.model("Task")
const Goal = mongoose.model("Goal")
const Diary =mongoose.model("Diary")
const requireLogin = require('../middleware/requireLogin')
const cors = require('cors')
router.use(cors())
router.post("/adddiary",requireLogin,(req,res)=>{
  var diary = new Diary(req.body.diary);
  diary.save().then((resp) => {
    console.log(resp);
    res.send(diary)
        })
})
module.exports=router
