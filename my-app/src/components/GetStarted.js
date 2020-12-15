import React,{useState,useEffect,useCallback,useRef} from 'react';
import {Link} from 'react-router-dom'
import { useTransition, animated } from 'react-spring'
import backg from './images/background.jpg'
import listimg from './images/430291.jpg'
import Grid from '@material-ui/core/Grid';
import { Parallax } from 'react-parallax';
export const GetStarted=()=>{
  const ref = useRef([])
  const [items, set] = useState([])
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
  useEffect(() => void reset(), [])

  return(
    < >
    <Grid container  spacing={2}>
    <Grid item xs={12}>
        <div className="nav-wrapper">
              <nav className="transparent z-depth-0">
       <a href="/" className="brand-logo1 brand-logo">Life App</a>
       <ul id="nav-mobile" className="right hide-on-down">
          <li>
          <Link to="/signin">
               <div className="waves-effect red btn gsbtn" >Sign in</div>
               </Link>
          </li>
       </ul>
   </nav>
</div>
</Grid>
<Grid item xs={12}>
<div>
<img src={listimg} style={{height:'800px'}}></img>
</div>
  <div className="animcon">
  {transitions.map(({ item, props: { innerHeight, ...rest }, key }) => (
    <animated.div className="transitions-item" key={key} style={rest} onClick={reset}>
      <animated.div style={{ overflow: 'hidden', height: innerHeight }}>{item}</animated.div>
    </animated.div>
  ))}
  </div>
  </Grid>
</Grid>
      < />
  )}
  export default GetStarted
