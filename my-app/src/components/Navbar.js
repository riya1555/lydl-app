import React,{useContext,useEffect} from 'react'
import _ from "lodash"
//import {Link,useHistory} from 'react-router-dom'
import {MyContext} from '../App.js'
import App from '../App.js'
import Home from './Home'
import M from 'materialize-css'
import star from "./images/Star1.png"
import polygon1 from "./images/Polygon1.svg"
import Ellipse1 from "./images/Ellipse1.png"
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Avatar from '@material-ui/core/Avatar'

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import Link from '@material-ui/core/Link';
const Logoutt=()=>{
  const user=useContext(MyContext)
return(
  <>
  <div class="level">
    Lvl {user.data.level}
  </div>
  <div class="nav-items">
<SimpleMenu2/>
  </div>
  <div class="profile-pic">
    <SimpleMenu/>
  </div>
  </>)
}
const SimpleMenu2=()=>{
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  /*

  return( <>
    <span>Tasks</span>
      <img class="polygon1" src={polygon1} alt=""/></>
    )
  */


    return(
      <div>
       <div
         ref={anchorRef}
         aria-controls={open ? 'menu-list-grow' : undefined}
         aria-haspopup="true"
         onClick={handleToggle}
       >
       <span style={{cursor:"pointer"}}>Tasks
       <img  src={polygon1} alt="" className={`fa-arrow-down ${open?"open":""}`}/>
       </span>
       </div>
       <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
         {({ TransitionProps, placement }) => (
           <Grow
             {...TransitionProps}
             style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
           >
             <Paper>
               <ClickAwayListener onClickAway={handleClose}>
                 <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                   <MenuItem onClick={handleClose}>Goals</MenuItem>
                   <MenuItem onClick={handleClose}>      <Link href="/weekly" >
        Link
      </Link></MenuItem>
                   <MenuItem onClick={handleClose}>Diary</MenuItem>
                 </MenuList>
               </ClickAwayListener>
             </Paper>
           </Grow>
         )}
       </Popper>
     </div>
    )
}
function SimpleMenu() {
  const user=useContext(MyContext)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = (e,r) => {
    setAnchorEl(null);
    console.log(e,r);
  }
  return (
    <div >
      <Avatar alt="Remy Sharp" src={user.data.pic} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}/>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onMouseLeave={handleClose}
      >
        <MenuItem onClick={handleClose} id="profile">Profile</MenuItem>
        <MenuItem onClick={handleClose} id="account">My account</MenuItem>
        <MenuItem onClick={handleClose} id="logout">
        <a href="/auth/logout" style={{color: 'inherit',textDecoration:'none '}}>Logout</a>
        </MenuItem>
      </Menu>
    </div>
  );
}

const Logout=()=>{
  const user=useContext(MyContext)
if(_.isEmpty(user.data)){
  return(<><li><a href="/Signin">Singnin</a></li>
  <li><a href="/Signup">Signup</a></li>
  <li><a href="/About">About</a></li></>
)}
else{
  return(
  <Logoutt/>
  )
}
}
const Navbar=()=>{
return(
 <nav>
   <div class="nav-logo">
     <img src={star} alt="g"/>
   </div>
   <Logout/>
 </nav>
)
}
export default Navbar;
