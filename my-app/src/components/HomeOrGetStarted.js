import React,{useState,useEffect,useContext} from 'react'
import App from '../App';
import _ from "lodash";
import Home from './Home.js'
import GetStarted from './GetStarted.js'
import Navbar from './Navbar.js'
import {MyContext} from '../App'
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
const HomeorGetStarted=(()=>{
const userr=useContext(MyContext)
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
