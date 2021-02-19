import React,{useEffect,useState} from "react";
import './styles.css'
import Calender from "./Calender"
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
export default function TaskDetailsDialog(props) {
  const streak=props.item.streak;
  const arr=[new Date(),new Date(2020,10,1),new Date(2020,10,4)]
  /*
  useEffect(()=>{
    const s='/task/'+props.item._id
    console.log(s);
    fetch(s,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>res.json()).then((json)=>console.log(json)).catch(err=>console.log(err))
  }, [])  */
  const [opentaskDialog,setOpentaskDialog]=useState(false)
  function openTaskDetails(){
    setOpentaskDialog(true)
  }
  function closeTaskDetails(){
    setOpentaskDialog(false)
  }
  return (<>
    <span onDoubleClick={openTaskDetails}>{props.item.taskName.slice(0,30)}</span><span style={{float:"right"}}>{(streak>=0)?(streak>6?streak+"❣️":streak):""}</span>
    <Dialog  onClose={closeTaskDetails} aria-labelledby="simple-dialog-title" open={opentaskDialog} fullWidth={true} maxWidth={'md'}>
<DialogTitle><span style={{    textTransform: "uppercase",letterSpacing: "2px"}}>{props.item.taskName} </span><span style={{float:"right"}}>{(streak>3)?(streak>6?streak+"❣️":streak):""}</span></DialogTitle>
<DialogContent>
  <DialogContentText>
    {props.item.taskDescription}
      <Calender datesDone={props.item.datesDone} />
  </DialogContentText>
</DialogContent>
<DialogActions>
  <Button onClick={closeTaskDetails} color="primary">
    Cancel
  </Button>
  <Button onClick={closeTaskDetails} color="primary">
    Subscribe
  </Button>
</DialogActions>
</Dialog>
  </>)
}
