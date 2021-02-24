import React,{useContext,useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Paper,TextField } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import addbuttonimg from "./images/add_circle_24px.png"
import M from 'materialize-css'
import {MyContext} from '../App'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import DateFnsUtils from '@date-io/date-fns';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import {
  KeyboardTimePicker, MuiPickersUtilsProvider
} from '@material-ui/pickers';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color:theme.palette.primary.main
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

export default function SpringModal(props) {
const classes = useStyles();
const [open, setOpen] = React.useState(false);
const [fullWidth, setFullWidth] = React.useState(true);
const [maxWidth, setMaxWidth] = React.useState('sm');
const [fetched,setfetched]=props.prop
const user=useContext(MyContext)
const [repeat,setRepeat]=useState(false)
let date=props.date?props.date:new Date()
const [task,setTask]=useState({
  taskName:"",
  date:date,
  belongsTo:user.data._id,
  datenum:date.getDate(),
  monthnum:date.getMonth(),
  yearnum:date.getFullYear(),
  fromTime:new Date(),
  toTime:(new Date()).setHours(date.getHours()+1),
  time:new Date(),
  taskType:'productive',
  repeat:'Never',
  repeatdays:[],
  taskTier:Number,
  taskDescription:String,
  skipsperweek:0
})

const handleClickOpen = () => {
  setOpen(true);
};
const [daysRepeat, setDaysRepeat] = React.useState({
  Everyday:false,
  Sun:false,
  Mon:false,
  Tue:false,
  Wed:false,
  Thu:false,
  Fri:false,
  Sat:false,
})
const handleClose = () => {
  setOpen(false);
};
useEffect(()=>{
  let arr=new Array()
if(daysRepeat.Sun)
arr.push(0);
if(daysRepeat.Mon)
arr.push(1);
if(daysRepeat.Tue)
arr.push(2);
if(daysRepeat.Wed)
arr.push(3);
if(daysRepeat.Thu)
arr.push(4);
if(daysRepeat.Fri)
arr.push(5);
if(daysRepeat.Sat)
arr.push(6);
if(!repeat){
  arr=[]
}
if(arr.length>0){
  task.repeat="Everyday"
}
else
task.repeat="Never"
setTask((task)=>{
    return {...task,repeatdays:arr}
  })
}, [daysRepeat],[repeat])
const handleChange = (prop) => (event) => {
  setTask({ ...task, [prop]: event.target.value });
  console.log(task);
};
const handleChange2 = (prop) => (event) => {
  setTask({ ...task, [prop]:event });
  console.log(task);
};
const handleChange3=(event)=>{
  setDaysRepeat({...daysRepeat, [event.target.name]:event.target.checked})
}
  const PostDataCheck=(key)=>{
    if(key=="Enter"){
    PostData()
    handleClose()
  }
  }
  const enterCheck=(key)=>{
    if(key==="Enter")
    handleClickOpen()
  }
  const PostData= ()=>{
    setfetched(false)
    setTask({...task,taskName:""});
    fetch("/addtask",{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            task
        })
    }).then(res=>res.json())
    .then(data=>{
       if(data.error){
          M.toast({html: data.error,classes:"#c62828 red darken-3"})
       }
       else{
           M.toast({html:"POSTED",classes:"#43a047 green darken-1"})
           user.dispatch({type:"USER",payload:(data)})
       }
    }).catch(err=>{
        console.log(err)
    })
  }
  return (
    <div>
        <div class="inputtodo">
          <input type="text"
          placeholder=""
          value={task.taskName||''}
          onChange={(e)=>setTask({
            ...task,
            taskName:e.target.value})}
            onKeyUp={(e)=>enterCheck(e.key)}/>
          <img src={addbuttonimg} alt="not found" onClick={()=>handleClickOpen()}/>
        </div>
        <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
                onKeyUp={(e)=>PostDataCheck(e.key)}
              >
          <DialogTitle id="max-width-dialog-title">{task.taskName.toUpperCase()}</DialogTitle>
            <DialogContent>
                <div className={classes.root}>
                <FormControl fullWidth className={classes.margin} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-amount">Description</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    value={task.description}
                    onChange={handleChange('taskDescription')}
                    labelWidth={80}
                  />
                </FormControl>
                  <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                <form className={classes.container} noValidate>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                < KeyboardTimePicker
              margin = "normal"
              id = "time-picker"
              label = "Start Time"
              value = {
                task.fromTime
              }
              onChange = {
                handleChange2('fromTime')
              }
              KeyboardButtonProps = {
                {
                  'aria-label': 'change time',
                }
              }
              />
            <
              /MuiPickersUtilsProvider>
              </form>
              </FormControl>
              <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                <form className={classes.container} noValidate>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                margin = "normal"
                id = "time-picker"
                label = "End Time"
                value = {
                  task.toTime
                }
                onChange = {
                  handleChange2('toTime')
                }
                KeyboardButtonProps = {
                  {
                    'aria-label': 'change time',
                  }
                }
                />
                </MuiPickersUtilsProvider>
                  </form>
                </FormControl>
  <div>
  <FormControlLabel label="Repeat Task"
  control={<Switch
     checked={repeat}
     onChange={(event)=>{setRepeat(event.target.checked)}}
     name="Repeat"
     inputProps={{ 'aria-label': 'secondary checkbox' }}
   />}/>
  <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
{/*
<InputLabel id="demo-simple-select-helper-label">Repeat</InputLabel>
<Select
labelId="demo-simple-select-helper-label"
id="demo-simple-select-helper"
onChange={handleChange('repeat')}
>
<MenuItem value="">
<em>None</em>
</MenuItem>
<MenuItem value="Everyday">Everyday</MenuItem>
<MenuItem value='Monday'>Monday</MenuItem>
<MenuItem value='Tuesday'>Tuesday</MenuItem>
<MenuItem value='Wednesday'>Wednesday</MenuItem>
<MenuItem value='Thursday'>Thursday</MenuItem>
<MenuItem value='Friday'>Friday</MenuItem>
<MenuItem value='Saturday'>Saturday</MenuItem>
<MenuItem value='Sunday'>Sunday</MenuItem>
</Select>*/}
{!repeat?"":<><FormLabel component="legend">Repeat </FormLabel>
<FormGroup>
<FormControlLabel label="Sunday"
control={<Switch
   checked={daysRepeat.Sun}
   onChange={handleChange3}
   name="Sun"
   inputProps={{ 'aria-label': 'secondary checkbox' }}
 />}/>
 <FormControlLabel label="Monday"
 control={<Switch
    checked={daysRepeat.Mon}
    onChange={handleChange3}
    name="Mon"
    inputProps={{ 'aria-label': 'secondary checkbox' }}
  />}/>
  <FormControlLabel label="Tueday"
  control={<Switch
     checked={daysRepeat.Tue}
     onChange={handleChange3}
     name="Tue"
     inputProps={{ 'aria-label': 'secondary checkbox' }}
   />}/>
   <FormControlLabel label="Wednesday"
   control={<Switch
      checked={daysRepeat.Wed}
      onChange={handleChange3}
      name="Wed"
      inputProps={{ 'aria-label': 'secondary checkbox' }}
    />}/>
    <FormControlLabel label="Thursday"
    control={<Switch
       checked={daysRepeat.Thu}
       onChange={handleChange3}
       name="Thu"
       inputProps={{ 'aria-label': 'secondary checkbox' }}
     />}/>
     <FormControlLabel label="Friday"
     control={<Switch
        checked={daysRepeat.Fri}
        onChange={handleChange3}
        name="Fri"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />}/>
      <FormControlLabel label="Saturday"
      control={<Switch
         checked={daysRepeat.Sat}
         onChange={handleChange3}
         name="Sat"
         inputProps={{ 'aria-label': 'secondary checkbox' }}
       />}/>
       </FormGroup>
       <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
       <InputLabel id="demo-simple-select-helper-label">Skips per week</InputLabel>
       <Select
       labelId="demo-simple-select-helper-label"
       id="demo-simple-select-helper"
       value={task.skipsperweek}
       onChange={handleChange('skipsperweek')}
       >
       <MenuItem value={0}>
       <em>0</em>
       </MenuItem>
       {task.repeatdays.length>0?<MenuItem value={1}>1</MenuItem>:""}
       {task.repeatdays.length>1?<MenuItem value={2}>2</MenuItem>:"" }
       {task.repeatdays.length>2? <MenuItem value={3}>3</MenuItem>:""}
       {task.repeatdays.length>3? <MenuItem value={4}>4</MenuItem>:""}
       </Select>
       </FormControl>
       </>}
</FormControl>

</div>
                </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>{
            PostData()
            handleClose()
          }} color="primary">
            Done
          </Button>
        </DialogActions>

      </Dialog>
    </div>
  );
}
