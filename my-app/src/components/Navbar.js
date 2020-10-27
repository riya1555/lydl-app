import React,{useContext,useEffect} from 'react';
import _ from "lodash";
//import {Link,useHistory} from 'react-router-dom';
import {MyContext} from '../App.js'
import App from '../App.js'
import Home from './Home';
import M from 'materialize-css'
import star from "./images/Star1.png"
import polygon1 from "./images/Polygon1.svg"
import Ellipse1 from "./images/Ellipse1.png"
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
const Logoutt=()=>{
  const user=useContext(MyContext)
return(
  <>
  <div class="level">
    Lvl {user.data.level}
  </div>
  <div class="nav-items">
    <span>Tasks</span>
    <img class="polygon1" src={polygon1} alt=""/>
  </div>
  <div class="profile-pic">
    <SimpleMenu/>
  </div>
  </>)
}
function SimpleMenu() {
  const user=useContext(MyContext)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(<div style={{position:'absolute',top:'20px',left:'500px'}}></div>);
  };

  const handleClose = (e,r) => {
    setAnchorEl(null);
    console.log(e,r);
  }
  return (
    <div>
      <Avatar alt="Remy Sharp" src={user.data.pic} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
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
