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
export const MyContext=createContext()
const Routing = ()=>{
  return(
    <Switch>
      <Route exact path="/" >
      <HomeorGetStarted />
      </Route>
      <Route exact path="/signin">
        <Signin />
      </Route>
      <Route exact path="/signup">
      <Navbar/>
        <Signup />
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
    <ThemeProvider theme={theme}>
    <MyContext.Provider value={{data,dispatch}}>
    <BrowserRouter>
<Routing/>
    </BrowserRouter>
    </MyContext.Provider>
    </ThemeProvider>
  );
}

export default App;
