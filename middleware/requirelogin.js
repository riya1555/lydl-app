const passport=require('passport')
module.exports = (req,res,next)=>{
  if(req.isAuthenticated()){
    next()
  }
else{
    console.log(req)
     return res.status(401).json({error:"you must be logged in"})
}
}
