import React, { useRef,useState,useEffect,useContext } from 'react'
import {MyContext} from '../App'
import clamp from 'lodash-es/clamp'
import swap from 'lodash-move'
import { useGesture } from 'react-use-gesture'
import { useSprings, animated, interpolate } from 'react-spring'
import { Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SpringModal from './addtodoitempopup.js'
import DeleteIcon from '@material-ui/icons/Delete';
import EditTask from './editdialog.js'
import TaskDetailsDialog from './TaskDetailsDialog.js'
export const fn = (order, down, originalIndex, curIndex, y) => index =>
  down && index === originalIndex
    ? { y: curIndex * 30 + y, scale: 1.1, zIndex: '1', shadow: 1, immediate: n => n === 'y' || n === 'zIndex' }
    : { y: order.indexOf(index) * 30, scale: 1, zIndex: '0', shadow: 0, immediate: false }
export function Draggablelist({userr}) {
  const user=useContext(MyContext)
  const [fetched,setfetched]=useState(false)
  const [items,setItems]=useState(['',''])
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
      fetch("/getalltasks/"+new Date().getDate()+"/"+new Date().getMonth()+"/"+new Date().getYear(),{
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
          order.current=items.map((_, index) => index)
          setSprings(data,fn(order.current))
         }
      }).catch(err=>{
          console.log(err)
      })
  },[fetched])
function handleCheck(event,i){
    event.target.checked=!event.target.checked
    setItems((items)=>{
    const temp=[...items]
    temp[i].completed=!temp[i].completed
    event.target.checked=!temp[i].completed
    if(temp[i].completed){
      const idt=temp[i]._id
      fetch("/taskcompleted/"+idt,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        },
      }).then(console.log("done")).catch(err=>console.log(err))
    }
    else if(!temp[i].completed){
      const idt=temp[i]._id
      fetch("/undotaskcompleted/"+idt,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        },
      }).then(console.log("done")).catch(err=>console.log(err))
    }
    return temp
    })
    console.log(items)
}
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
        <Checkbox
          checked={items[i].completed}
          onChange={(event)=> handleCheck(event,i)}
          name={items[i].taskName}
          color="primary"
        />
        <TaskDetailsDialog item={items[i]}/>
        <DeleteIcon onClick={(e)=>{deleteTask(e,i)}} style={{float:"right",display:viewProperty[i]?'block':'none'}}/>
        <EditTask onClick={()=>handleMouseLeave(i)} item={items[i]} style={{float:"right",display:viewProperty[i]?'block':'none'}}/>
        </animated.div>
      )})}
    </ul>
     <SpringModal prop={[fetched,setfetched]}/>
</div>
  )
  else
  return <>loading...</>
}
