import React, { useRef,useState,useEffect,useContext } from 'react'
import clamp from 'lodash-es/clamp'
import swap from 'lodash-move'
import { useGesture } from 'react-use-gesture'
import { useSprings, animated, interpolate } from 'react-spring'
import { Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {MyContext} from '../App'
import _ from "lodash";
import SpringModal from './addtodoitempopup.js'
import Navbar from './Navbar.js'
import TaskDetailsDialog from './TaskDetailsDialog.js'
const useStyles = makeStyles((theme) => ({
  root: {
  },
  paper: {
    padding: theme.spacing(2),
    /*
    textAlign: 'center',
    */
    height: 380,
    color: theme.palette.text.secondary,
  },
}));
const montharr=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"]
const daysarr=["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sun"]

export default function Weeklylist() {
  const classes = useStyles();
  const [date1,setDate1]=useState(new Date());
  const daynum= date1.getDay();
  return (
    <>
    <Navbar style={{position:"inherit"}}/>
    <Container className="weeklylistcontainer">

    <Button style={{position:"absolute",left:"5px",top:"49%"}} variant="contained" color="primary" onClick={()=>(setDate1(new Date(date1.setDate(date1.getDate()-7))))}>
  Prev
</Button>
<Button style={{position:"absolute",right:"5px",top:"49%"}} variant="contained" color="primary" onClick={()=>(setDate1(new Date(date1.setDate(date1.getDate()+7))))}>
  Next
</Button>
    <Grid container spacing={3}>
  <Grid item xs={3}>
    <Paper className={classes.paper}>    <Draggablelist2 date={new Date(date1.getFullYear(),date1.getMonth(),date1.getDate()-daynum)}/></Paper>
  </Grid>
  <Grid item xs={3}>
    <Paper className={classes.paper}>    <Draggablelist2 date={new Date(date1.getFullYear(),date1.getMonth(),date1.getDate()-daynum+1)}/></Paper>
  </Grid>
  <Grid item xs={3}>
    <Paper className={classes.paper}>    <Draggablelist2 date={new Date(date1.getFullYear(),date1.getMonth(),date1.getDate()-daynum+2)}/></Paper>
  </Grid>
  <Grid item xs={3}>
    <Paper className={classes.paper}>    <Draggablelist2 date={new Date(date1.getFullYear(),date1.getMonth(),date1.getDate()-daynum+3)}/></Paper>
  </Grid>
  </Grid>
  <Grid container spacing={3} justify="center">
  <Grid item xs={3}>
    <Paper className={classes.paper}>    <Draggablelist2 date={new Date(date1.getFullYear(),date1.getMonth(),date1.getDate()-daynum+4)}/></Paper>
  </Grid>
  <Grid item xs={3}>
    <Paper className={classes.paper}>    <Draggablelist2 date={new Date(date1.getFullYear(),date1.getMonth(),date1.getDate()-daynum+5)}/></Paper>
  </Grid>
  <Grid item xs={3}>
    <Paper className={classes.paper}>    <Draggablelist2 date={new Date(date1.getFullYear(),date1.getMonth(),date1.getDate()-daynum+6)}/></Paper>
  </Grid>
</Grid>
    </Container>
    </>
  );
}
export const fn = (order, down, originalIndex, curIndex, y) => index =>
  down && index === originalIndex
    ? { y: curIndex * 30 + y, scale: 1.1, zIndex: '1', shadow: 1, immediate: n => n === 'y' || n === 'zIndex' }
    : { y: order.indexOf(index) * 30, scale: 1, zIndex: '0', shadow: 0, immediate: false }
function Draggablelist2(date) {
  const user=useContext(MyContext)
  const [fetched,setfetched]=useState(false)
  const [items,setItems]=useState(user.data.todolist)
  const [viewProperty,setViewProperty]=useState([])
  const order = useRef(items.map((_, index) => index)) // Store indicies as a local ref, this represents the item order
  const [springs, setSprings] = useSprings(items.length, fn(order.current)) // Create springs, each corresponds to an item, controlling its transform, scale, etc.
  const bind = useGesture(({ args: [originalIndex],event, down, delta: [, y] }) => {
    const curIndex = order.current.indexOf(originalIndex)
    const curRow = clamp(Math.round((curIndex * 30 + y) / 30), 0, items.length - 1)
    const newOrder = swap(order.current, curIndex, curRow)
    setSprings(fn(newOrder, down, originalIndex, curIndex, y)) // Feed springs new style data, they'll animate the view without causing a single render
    if (!down){
      order.current = newOrder
    }
  })
  useEffect(()=>{
    console.log(date.date)
    setfetched(false)
      fetch("/getalltasks/"+date.date.getDate()+"/"+(date.date.getMonth())+"/"+date.date.getFullYear(),{
          method:"GET",
          headers:{
              "Content-Type":"application/json"
          }
      }).then(res=>res.json())
      .then(data=>{
         if(data.error){
            console.log(data)
         }
         else{
          setItems(data)
          setfetched(true)
         }
      }).catch(err=>{
          console.log(err)
      })
  },[date])

function deleteTask(e,i){
  fetch("/deletetask/"+items[i]._id)
  const temp=[...items].filter((item => item !== items[i]))
  console.log(temp);
  setItems(temp)
}
function handleMouseOver(i){
setViewProperty((viewProperty)=>{
  const temp= viewProperty
  temp[i]=true
  return [...temp]
})
}
function handleMouseLeave(i){
setViewProperty((viewProperty)=>{
  const temp= viewProperty
  temp[i]=false
  return [...temp]
})
}

if(fetched)
  return (
    <div class="todolist1">
    <span>
      <h3 style={{color:"grey"}}>{date.date.getDate()+" "+montharr[date.date.getMonth()]}<span style={{float:"right",fontSize:"12px",color:"grey"}}>{daysarr[date.date.getDay()]}</span></h3></span>
      <div class="tasks">
    <div >
    <ul className="content" style={{height:'80%',width:'100%',overflow:'scroll'}}>
      {springs.map(({ zIndex, shadow, y, scale }, i) => {
        return (<animated.div
          {...bind(i)}
          key={i}
          style={{
            zIndex,
            boxShadow: shadow.interpolate(s => `rgba(0, 0, 0, 0.15) 0px ${s}px 0px 0px`),
            transform: interpolate([y, scale], (y, s) => `translate3d(0,${y}px,0)`),
            userSelect:'none'
          }}
          className="boxxx"
          onMouseOver={()=>handleMouseOver(i)}
          onMouseLeave={()=>handleMouseLeave(i)}
        >
        <TaskDetailsDialog item={items[i]}/>
        </animated.div>
      )})}
    </ul>
</div>
</div>
{(date.date)>=(new Date().setHours(0,0,0,0))
  ? <SpringModal prop={[fetched,setfetched]} date={date.date}/>
  : ""
}
        </div>
  )
  else
  return <>loading...</>
}
