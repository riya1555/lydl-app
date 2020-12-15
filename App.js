const express =require('express');
const app=express();
const mongoose=require('mongoose');
const PORT=process.env.PORT||'5000';
const {MONGOURI} =require("./config/keys");
const session = require('express-session')
const passport=require('passport')
const passportLocalMongoose=require('passport-local-mongoose')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cors = require('cors')
app.use(cors())
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie:{
    maxAge:100000000000
  }
}))
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
app.use(passport.initialize())
app.use(passport.session())

mongoose.set('useCreateIndex', true)
mongoose.connect(MONGOURI,{ useNewUrlParser: true,useUnifiedTopology: true, useFindAndModify: false  });
mongoose.connection.on('connected',()=>{
console.log("connected to mongooooo");
})
const User=require('./models/user')
const Task=require('./models/task')
const Goal=require('./models/goal')
const Diary=require('./models/diary')
passport.use(User.createStrategy());
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/todolist'))
app.use(require('./routes/diary'))
//router.set('trust proxy', 1) // trust first proxy
var tod = new Date();
const Today = mongoose.model('today', { date: Date });
const d1 = new Today({ date: tod  });
d1.save().then(() => console.log('meow'));
app.listen(PORT,()=>{
  console.log("okay");
})
const Hello={
  "wada":"LOL"
}
app.get("/abb",(req,res)=>{
Today.findOne({},function f(err,arr){
  res.json(arr);
});
})
if(process.env.NODE_ENV==='production'){
  app.use(express.static('my-app/build'))
  const path=require('path')
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'my-app','build','index.html'))
  })
}
