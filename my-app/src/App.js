import React from 'react';
import {useEffect,createContext,useReducer,useContext} from 'react';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme.js'
import Navbar from '././components/Navbar'
import Signin from "././components/Signin"
import Signup from "././components/Signup"
import {About} from "././components/About.js"
import GetStarted from "././components/GetStarted"
import {reducer,initialState} from "./contexts/userReducer";
import HomeorGetStarted from "././components/HomeOrGetStarted"
import Weeklylist from '././components/Weeklylist';
import _ from "lodash";
import CircularProgress from '@material-ui/core/CircularProgress';

export const MyContext=createContext()
const Routing = ()=>{
  const user= useContext(MyContext)
  return(
    <Switch>
    <Route path ="/weekly">
    {
      (_.isEmpty(user.data))?<HomeorGetStarted/>:<Weeklylist/>
    }
    </Route>
      <Route exact path="/" >
      <HomeorGetStarted />
      </Route>
      <Route exact path="/signin">
        <Signin />
      </Route>
      <Route path="/signup/:email" component={Signup}>
        </Route>
        <Route path="/signup" component={Signup}>
          </Route>
        <Route exact path="/about">
        <Navbar/>
          <About />
          </Route>
          <Route path ="/getstarted">
          <Navbar/>
          <GetStarted/>
          </Route>
    </Switch>
  )
}
function App() {
const [data,dispatch]=useReducer(reducer,initialState)
useEffect(() => {
    fetch("/ff")
        .then(res => res.json())
        .then(res =>
        {
           dispatch({type:"USER",payload:(res)})
           console.log(res);
        }
)
        .catch(err => {
            console.log(err);
        });
}, []);
  return (
    <ThemeProvider theme={theme} >
    <MyContext.Provider value={{data,dispatch}}>
    <BrowserRouter>
<Routing/>
    </BrowserRouter>
    </MyContext.Provider>
    </ThemeProvider>
  );
}

export default App;
