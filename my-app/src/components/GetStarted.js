import React,{useState,useEffect,useCallback,useRef} from 'react';
import {Link} from 'react-router-dom'
import { useTransition, animated } from 'react-spring'
import backg from './images/background.jpg'
import M from 'materialize-css'
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
useEffect(()=>{
      var elems = document.querySelectorAll('.parallax');
      var instances = M.Parallax.init(elems);
  },[])
  return(
    < >
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
    <div className="parallax-container">
    <div className="parallax">
    <img src={backg} alt="vyvyv" />
    </div>
  </div>
  <div className="animcon">
  {transitions.map(({ item, props: { innerHeight, ...rest }, key }) => (
    <animated.div className="transitions-item" key={key} style={rest} onClick={reset}>
      <animated.div style={{ overflow: 'hidden', height: innerHeight }}>{item}</animated.div>
    </animated.div>
  ))}
  </div>
  <div className="section white" style={{height:"300vh"}}>
        <div className="row container">
          <h2 className="header"></h2>

          <p className="grey-text text-darken-3 lighten-3">Parallax is an effect where the background content or image in this case, is moved at a different speed than the foreground content while scrolling.</p>
        </div>
      </div>
      <div className="parallax-container">
      <div className="parallax">
      <img src={backg} alt="vyvyv" />
      </div>
    </div>
      < />
  )}
  export default GetStarted
