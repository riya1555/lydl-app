import React,{useState,useEffect,useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {MyContext} from '../App.js'
import M from 'materialize-css'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Riya Chaudhary
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    /*
    backgroundImage: 'url(https://source.unsplash.com/random)',
    */
    backgroundRepeat: 'no-repeat',
    backgroundColor:
    theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));
export default function Signup(props) {
  console.log(props)
  const classes = useStyles();
  const user=useContext(MyContext)
  const history = useHistory()
  const [username,setUsername] = useState("")
  const [password,setPasword] = useState("")
  const [email,setEmail] = useState(()=>{return props.match.params.email?props.match.params.email:""})
  const [image,setImage] = useState("")
  const [url,setUrl] = useState("")
  useEffect(()=>{
    uploadFields()
  }, [url])

  const uploadPic = async ()=>{
      const data = new FormData()
      data.append("file",image)
      data.append("upload_preset","lifeapp")
      data.append("cloud_name","jayantchaudhary")
      fetch("https://api.cloudinary.com/v1_1/jayantchaudhary/image/upload",{
          method:"post",
          body:data
      })
      .then(res=>res.json())
      .then(data=>{
         setUrl(data.url)
      })
      .catch(err=>{
          console.log(err)
      })
  }
  const uploadFields = ()=>{
if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
          M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
          return
      }
      fetch("/signup",{
          method:"post",
          headers:{
              "Content-Type":"application/json"
          },
          body:JSON.stringify({
              username,
              password,
              email,
              url
          })
      }).then(res=>res.json())
      .then(data=>{
        console.log(data)
         if(data.error){
            M.toast({html: data.error.message,classes:"#c62828 red darken-3"})

         }
         else{
           M.toast({html:data.username,classes:"#43a047 green darken-1"})
             user.dispatch({type:"USER",payload:data})
             history.push('/')
         }
      }).catch(err=>{
          console.log(err)
      })
  }
  const PostData = async()=>{
      if(image){
          await uploadPic()
      }
      else
          uploadFields()
      }

  const keyPress = (key)=>{
    if(key==="Enter"){
           PostData();
    }
  }
  const keyPresss = (key)=>{
    if(key==="Enter"){
           document.getElementById('password').focus()
    }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            autoFocus
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            onKeyUp={(e)=>keyPresss(e.key)}
            className={classes.inputfield}
            style={{borderBottom:"none"}}
          />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              autoFocus
              placeholder="username"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              onKeyUp={(e)=>keyPresss(e.key)}
              className={classes.inputfield}
              style={{borderBottom:"none"}}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="password"
              placeholder="password"
              value={password}
              onChange={(e)=>setPasword(e.target.value)}
              onKeyUp={(e)=>keyPress(e.key)}
              id="password"
              className={classes.inputfield}
            />
            < Button
            variant = "contained"
            component = "label">
              Upload File
              <input
            type = "file"
            onChange={(e)=>setImage(e.target.files[0])}
            hidden/>
              </Button>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={()=>PostData()}
            >
              Sign Up
            </Button>
            <div style={{textAlign:"center"}}><a href="/auth/google" className="fa fa-google waves-effect waves-light"> Sign In with Google</a>
          </div>
            <Grid container>
              <Grid item xs>
                <Link href="/reset" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

/*
import React,{useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'

const Signup=()=>{
    const history = useHistory()
    const [username,setName] = useState("")
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    useEffect(()=>{
      uploadFields()
    }, [url])
    const uploadPic = async ()=>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","lifeapp")
        data.append("cloud_name","jayantchaudhary")
        fetch("https://api.cloudinary.com/v1_1/jayantchaudhary/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
           setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const uploadFields = ()=>{
if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
        }
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                username,
                password,
                email,
                url
            })
        }).then(res=>res.json())
        .then(data=>{
          console.log(data)
           if(data.error){
              M.toast({html: data.error.message,classes:"#c62828 red darken-3"})

           }
           else{

               M.toast({html:data.username,classes:"#43a047 green darken-1"})
               history.push('/')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
    const PostData = async()=>{
        if(image){
            await uploadPic()
        }
        else
            uploadFields()
        }

        const keyPress = (key)=>{
          if(key==="Enter"){
                 PostData();
          }
        }

return  (
   <div className="mycard">
       <div className="card auth-card input-field">
         <h2>LifeApp</h2>
         <input
         type="text"
         placeholder="name"
         value={username}
         onChange={(e)=>setName(e.target.value)}
         />
         <input
         type="text"
         placeholder="email"
         value={email}
         onChange={(e)=>setEmail(e.target.value)}
         />
         <input
         type="password"
         placeholder="password"

         value={password}
         onChange={(e)=>setPasword(e.target.value)}
         onKeyUp={(e)=>keyPress(e.key)}
         />
         <div className="file-field input-field">
         <div className="btn #64b5f6 blue darken-1">
             <span>Upload pic</span>
             <input type="file"
             onChange={(e)=>setImage(e.target.files[0])}
              />
           }

         </div>
         <div className="file-path-wrapper">
             <input className="file-path validate" type="text" />
         </div>
         </div>
         <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
         onClick={()=>PostData()}
         >
             SignUP
         </button>

         <h5>
             <Link to="/signin">Already have an account ?</Link>
         </h5>





     </div>
     <div style={{textAlign:"center"}}><a href="/auth/google" class="fa fa-google waves-effect waves-light"> Sign In with Google</a>
   </div>
   </div>
)}
export default Signup
*/
