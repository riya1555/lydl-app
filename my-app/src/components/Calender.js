import React,{useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import FormHelperText from '@material-ui/core/FormHelperText'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import IconButton from '@material-ui/core/IconButton';

export default function Calender(props) {
  const datesDone=props.datesDone
  const [month,setmonth]=useState(10);
  const [year,setyear]=useState(2020);
  let thismonthdates=[]
  if(datesDone.length>0){
  thismonthdates=datesDone.filter((thisdate)=>(new Date(thisdate).getMonth()+1)===month&&(new Date(thisdate).getFullYear())===year
  )}
  function increasemonth(){
    if(month===12){
      setyear(year+1)
      setmonth(1)
    }
    else
    setmonth(month+1)
  }
  function decreasemonth(){
    if(month===1){
      setyear(year-1)
      setmonth(12)
    }
    else
    setmonth(month-1)
  }
  return (
    <Card>
      <CardContent>
      <div className="mainc">
      <IconButton onClick={decreasemonth}>
      <NavigateBeforeIcon color="secondary"/>
      </IconButton>
      <p>{month}/{year}</p>
      <IconButton onClick={increasemonth}>
      <NavigateNextIcon color="secondary"/>
      </IconButton>
      </div>
  <div className="mainc">
<Dates month={month} year={year} thismonthdates={thismonthdates}/>
    </div>
    </CardContent>
  </Card>
  );
}
function Dates(props){
  const today=new Date()
const date=new Date(2020,props.month-1,1)
const datemax=(new Date(2020,props.month,0)).getDate()
const day =date.getDay()
var items=[]
for(var i=0,k=1;i<35;i++)
{
  if(i>=day&&k<=datemax){
  items.push(k)
  k++
}
else{
  items.push(" ")
}
}
return(
  <>
  {items.map((item,i)=>{
    for(var j=0;j<props.thismonthdates.length;j++){
      if((new Date(props.thismonthdates[j])).getDate()===item){
        return(<div key={i} ><CheckCircleIcon key={i}/><FormHelperText for={i}>{item}</FormHelperText></div>)
      }
    }
return(<div>{item}</div>)
  })}
    </>
)
}
