import React,{useState,useEffect,useContext} from 'react'
import App from '../App';
import _ from "lodash";
import Home from './Home.js'
import GetStarted from './GetStarted.js'
import Navbar from './Navbar.js'
import {MyContext} from '../App'
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';
const HomeorGetStarted=(()=>{
  const [loading,setLoading]=useState(true)
  setTimeout(function(){
setLoading(false)
},2500)
const userr=useContext(MyContext)
if(loading){
return(
      <CircularProgress style={{position:"fixed",top:"50%",left:"50%"}}/>
    )}
    else
  if(_.isEmpty(userr.data)){
            return <GetStarted/>
          }
   else{
   return (<>
    <Navbar/>
     <Home/>
     </>)
    }
})
export default HomeorGetStarted
