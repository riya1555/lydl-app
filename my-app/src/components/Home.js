import React,{useContext,useState} from 'react';
import './styleshome.css';
import {MyContext} from '../App'
import {Draggablelist} from './Draggablelist.js'
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
const Home=()=>{
  const [data,setData] =useState({
    diaryEntry:'',
    date:new Date()
  })
const userr=useContext(MyContext)
function postData(){
  console.log(data);
  fetch("/adddiary",{
      method:"post",
      headers:{
          "Content-Type":"application/json"
      },
      body:JSON.stringify({
          data
      })
  }).then(res=>res.json())
  .then(data=>{
    console.log(data);
  }).catch(err=>{
      console.log(err)
  })
}
function changeDiaryEntry(event){
  setData({...data,diaryEntry:event.target.value})
}
if(userr.data.todolist)
return (
  <main>
    <div class="homepage">
      <div class="left">
        <div class="calender">
          <h1>25</h1>
          <p>2020 | July</p>
          </div>
        <div class="scrollspy">
          <ul>
            <li>TODO list</li>
            <li>Personal Diary</li>
            <li>Goals</li>
            <li>Motivation</li>
          </ul>
        </div>
    </div>
      <div class="right">
        <div class="todolist">
          <h3>Do Next</h3>
          <div class="tasks">
           <Draggablelist itemss={userr.data.username} style={{overflow:'scroll'}}/>
          </div>
        </div>
      </div>
    </div>
    <div class="diarypage">
      <div class="left">
        <h1>What’s Up ?</h1>
        <FormControl fullWidth >
      <Input
      className='textarea'
     id="standard-adornment-amount"
     value={data.diaryEntry}
     onChange={changeDiaryEntry}
     multiline
      />
</FormControl>
        <Button variant="contained" onClick={postData}>Post</Button>
      </div>
      <div class="right">
        <div class="calender">
          <p>“The only joy in the world is to begin.”</p>
          </div>
        <div class="scrollspy">
          <ul>
            <li>TODO list</li>
            <li>Personal Diary</li>
            <li>Goals</li>
            <li>Motivation</li>
          </ul>
        </div>
    </div>
    </div>
  </main>
)
else
return <>LOad</>
}
export default Home
