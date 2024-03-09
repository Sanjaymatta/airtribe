import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import toast from "react-hot-toast";
function Createtask({tasks,setTasks}){
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
    const[genId,SetGenId]=useState(0);
     function idcreate(){
        SetGenId(tasks.length+1);
        return(
         {genId}
        );
     }
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
  return(
  
       <form onSubmit={handleSubmit}>
        <label htmlFor='inp'>Enter task</label>
         <input type="text"   className="shadow bg-body rounded m-4 " id='inp' ></input>
         <label htmlFor='sta'>Enter Status</label>
         <input type="text"   className="shadow bg-body rounded m-4 " id='sta'></input>
         <label htmlFor='desc'>Describe</label>
         <input type="text"   className="shadow bg-body rounded m-4 " id='desc'></input>
         <button type="submit" className="btn btn-info " onClick={(e)=>setTask({...task,id:idcreate(),name:setname(),desc:setdesc(),status:setstatus()})}>Add</button>
       </form>
  
  );
}
export default Createtask;