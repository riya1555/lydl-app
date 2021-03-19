const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const session = require('express-session')
const passport=require('passport')
const passportLocalMongoose=require('passport-local-mongoose')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate')
const cors = require('cors')
router.use(cors())
require('dotenv').config()
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "https://lydl-app.herokuapp.com/auth/google/secrets"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate({ googleId: profile.id ,username:profile.id, pic:profile.photos[0].value,name:profile.displayName}, function (err, user) {
      return cb(err, user);
    })
  }
));
router.get("/ff",function(req,res){
  if(req.isAuthenticated()){
    console.log(req.user);
    res.json(req.user)
  }
  else{
    res.json({})
}})
router.post("/signup",function(req,res){
  console.log(req)
  User.register({username:req.body.username,email:req.body.email,pic:req.body.url},req.body.password,function(err,user){
    if(err){
      console.log(err);
      res.json({error: err}) ;
    }
    else{
      passport.authenticate("local")(req,res,function(){
             res.json(user)
        })
     }
  })
})

router.post('/login', function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return next(err);
            }

            if (!user) {
                return res.json({error:"NO USER FOUND"});
            }
                req.logIn(user, function (err) {
                    if (err) {
                        return res.json(err);
                    }

                        return res.json(user);
                });
        })(req, res, next);
    });
router.get("/auth/google",
  passport.authenticate("google" ,{ scope: ['profile']})
)
router.get('/auth/google/secrets',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("https://lydl-app.herokuapp.com/");
  });
  router.get("/auth/logout",function(req, res) {
    req.logout();
    res.redirect("https://lydl-app.herokuapp.com/");
  }
  )
module.exports=router
