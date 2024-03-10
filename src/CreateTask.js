import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import toast from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';
function Createtask({tasks,setTasks,setShowCreateTask}){
    const[task,setTask]=useState({
        id:"",
        name:"",
        desc:"",
        status:"",
    });

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks"));
        if (storedTasks) {
            setTasks(storedTasks);
        }
    }, []);
   
     function setname(){
         setTask(()=>{
            task.name=document.getElementById('inp').value;
        })
        return task.name;
     }
     function setdesc(){
         setTask(()=>{
            task.desc=document.getElementById('desc').value;
        })
        return task.desc;
     }
     function setstatus(){
         setTask(()=>{
            task.status=document.getElementById('sta').value;
        })
        return task.status;
     }
     const handleSubmit=(e)=>{
        e.preventDefault();
        setTasks((pre)=>{
         
            const list=[...pre,task];
            localStorage.setItem("tasks",JSON.stringify(list));
            return list;
        }); 
        toast.success("Added");
        document.getElementById('inp').value=""; 
        document.getElementById('desc').value=""; 
        document.getElementById('sta').value=""; 
     }
     const ap=()=>{

     }
  return(
        <center>
       <form onSubmit={handleSubmit}>
        <label htmlFor='inp'>Enter task</label>
         <input type="text"   className="shadow bg-body rounded m-4 " id='inp' ></input>
         <label htmlFor='sta'>Enter Status</label>
         <input type="text"   className="shadow bg-body rounded m-4 " id='sta'></input>
         <label htmlFor='desc'>Describe</label>
         <input type="text"   className="shadow bg-body rounded m-4 " id='desc'></input>
         <button type="submit" className="btn btn-info " onClick={(e)=>{setTask({...task,id:uuidv4(),name:setname(),desc:setdesc(),status:setstatus()});}}  >Add</button>
         <button type="button" className="btn btn-danger m-4" onClick={(e)=>{setShowCreateTask(false);toast.error("closed")}}>Close</button>
       </form>
       </center>
  );
}
export default Createtask;
