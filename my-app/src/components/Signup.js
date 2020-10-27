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
