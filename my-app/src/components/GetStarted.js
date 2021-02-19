import React,{useState,useEffect,useCallback,useRef,useContext} from 'react';
import {MyContext} from '../App.js'
import {Link} from 'react-router-dom'
import { useTransition, animated } from 'react-spring'
import backg from './images/background.jpg'
import listimg from './images/430291.jpg'
import Grid from '@material-ui/core/Grid';
import { Parallax } from 'react-parallax';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TextField from '@material-ui/core/TextField';
import { useHistory } from "react-router-dom";
export const GetStarted=()=>{
  const ref = useRef([])
  const ref1=useRef(null)
  const history = useHistory();
  const user=useContext(MyContext)
  const [wid,setwid]=useState("80px");
  const [items, set] = useState([])
  const [email,setEmail] = useState("")
  const transitions = useTransition(items, null, {
    from: { opacity: 0, height:" 0vw", innerHeight: "0vw", transform: 'perspective(600px) rotateX(0deg)', color: '#8fa5b6' },
    enter: [
      { opacity: 1, height: "5vw", innerHeight: "5vw" },
      { transform: 'perspective(600px) rotateX(180deg)', color: '#28d79f' },
      { transform: 'perspective(600px) rotateX(0deg)' },
    ],
    leave: [{ color: '#c23369' }, { innerHeight: "0vw" }, { opacity: 0, height: "0vw" }],
    update: { color: '#28b4d7' },
    //config:{ duration:1000}
  })
  const reset =useCallback(() => {
    console.log("run")
    ref.current.map(clearTimeout)
    ref.current = []
    set([])
     ref.current.push(setTimeout(() => set(['To', 'Do', 'List']), 2000))
      ref.current.push(setTimeout(() => set(['And', 'More']), 5000))
      ref.current.push(setTimeout(() => set(['To do list', 'And', 'More']), 8000))
  },[])
  useEffect(() => {
setwid((20*ref1.current.offsetWidth/100)+"px")
reset()
 window.addEventListener('resize', setwidd)
 return () => { window.removeEventListener('resize', setwidd)}
  }, [])
function setwidd(){
  setwid((20*ref1.current.offsetWidth/100)+"px");
}
function getstarted(){
  user.dispatch({type:"USER",payload:{email:email}})
  history.push('/signup');
}
  return(
    < >
    <div >
      <AppBar position="static" color="transparent" style={{boxShadow:"none"}}>
        <Toolbar>
          <Typography variant="h6" style={{flexGrow:1}}>
            LIFE APP
          </Typography>
          <Button color="inherit" style={{float:"right"}} onClick={()=>{history.push("/signin")}}>Login</Button>
        </Toolbar>
      </AppBar>
    </div>
    <Grid container justify="center"   alignItems="center">
    <Grid item xs={9}>
<div ref={ref1} style={{background: `url(${listimg})`,height:'90vh',backgroundRepeat:"no-repeat",backgroundSize:"contain"}}>
  <div  className="animcon" style={{position:'relative',left:"24.3%", top:wid }}>
  {transitions.map(({ item, props: { innerHeight, ...rest }, key }) => (
    <animated.div className="transitions-item" key={key} style={rest} onClick={reset}>
      <animated.div style={{ overflow: 'hidden', height: innerHeight }}>{item}</animated.div>
    </animated.div>
  ))}
  </div>
  </div>

  </Grid>
  <Grid item xs={3}>
<Grid container direction="row" justify="center" alignItems="center" spacing={2} >
<Grid item xs={10}>
<TextField value={email}
onChange={(e)=>setEmail(e.target.value)}
 fullWidth id="outlined-basic" label="Email address" variant="outlined" />
</Grid>
<Grid item xs={10}>
<Button fullWidth variant="contained" color="primary" onClick={()=>getstarted()}>
  Get Started Now
</Button>
</Grid>
<Grid item xs={10}>
<label style={{marginTop:"30px"}}>
  Or Continue with
</label>
</Grid>
<Grid item xs={10}>
<i class="fa fa-google" aria-hidden="true" style={{color:'aqua'}}></i>
<i class="fa fa-facebook-square" aria-hidden="true" style={{color:'aqua'}}></i>
<i class="fa fa-facebook-square" aria-hidden="true" style={{color:'aqua'}}></i>
<i class="fa fa-facebook-square" aria-hidden="true" style={{color:'aqua'}}></i>
</Grid>
</Grid>
</Grid>
</Grid>
      < />
  )}
  export default GetStarted
