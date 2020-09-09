import React,{useContext,useState} from 'react';
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
import EditIcon from '@material-ui/icons/Edit';
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
export default function EditTask(props){
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  let edittaskcurrent=props.item
    console.log(edittaskcurrent);
  const handleClose = () => {
    setOpen(false);
  };
  function PostDataCheck(key){
    if(key==='enter'){
      PostData()
    }
  }
  function PostData(){
    console.log(edittaskcurrent);
  }
  const handleChange = (prop) => (event) => {
    edittaskcurrent={ ...edittaskcurrent, [prop]: event.target.value };
    console.log(edittaskcurrent);
  };
    return(<>
      <EditIcon onClick={()=>setOpen(true)} style={props.style} />
      <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open}
          onClose={handleClose}
          aria-labelledby="max-width-dialog-title"
          onKeyUp={(e)=>PostDataCheck(e.key)}
        >
    <DialogTitle id="max-width-dialog-title">{edittaskcurrent.taskName?edittaskcurrent.taskName.toUpperCase():""}</DialogTitle>
      <DialogContent>
          <div className={classes.root}>
          <FormControl fullWidth className={classes.margin} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">Description</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              value={edittaskcurrent.description}
              onChange={handleChange('taskDescription')}
              labelWidth={80}
            />
          </FormControl>
            <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
          <form className={classes.container} noValidate>
            <TextField
              id="time"
              label='from'
              type="time"
              value={edittaskcurrent.fromTime}
              onChange={handleChange('fromTime')}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
          </form>
          </FormControl>
          <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
          <form className={classes.container} noValidate>
            <TextField
              id="time"
              label='to'
              type="time"
              value={edittaskcurrent.toTime}
              onChange={handleChange('toTime')}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
            </form>
          </FormControl>
  <div>
  <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
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
  </Select>
  </FormControl>
  <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
  <InputLabel id="demo-simple-select-helper-label">Time</InputLabel>
  <Select
  labelId="demo-simple-select-helper-label"
  id="demo-simple-select-helper"
  onChange={handleChange('timeDuration')}
  >
  <MenuItem value="">
  <em>None</em>
  </MenuItem>
  <MenuItem value={0.5}>0.5 hrs</MenuItem>
  <MenuItem value={1}>1 hrs</MenuItem>
  <MenuItem value={1.5}>1.5 hrs</MenuItem>
  <MenuItem value={2}>2 hrs</MenuItem>
  <MenuItem value={2.5}>2.5h hrs</MenuItem>
  <MenuItem value={3}>3 hrs</MenuItem>
  <MenuItem value={3.5}>3.5 hrs</MenuItem>
  <MenuItem value={4}>4 hrs</MenuItem>
  </Select>
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
</>)
}
