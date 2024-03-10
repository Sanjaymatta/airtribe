import { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { useDrop } from "react-dnd";
import Createtask from "./CreateTask";
import toast from "react-hot-toast";
const ListTask=({tasks,setTasks})=>{
    
    const [showCreateTask,setShowCreateTask]=useState(false);
     

    // const [start,setStart]=useState([]);
    // const [progress,setProgress]=useState([]);
    // const [completed,setCompleted]=useState([]);
    // useEffect(()=>{
    //     const fStart=tasks.filter((task)=>task.status==="notcompleted");
    //     const fInProgress=tasks.filter((task)=>task.status==="inprogress");
    //     const fCompleted=tasks.filter((task)=>task.status==="completed");
    //     setStart(fStart);
    //     setProgress(fInProgress);
    //     setCompleted(fCompleted);
    // },[tasks]);
    
 
    const statusarr=["notcompleted","inprogress","completed"];
    return(
        <div>
            <div className="row">
                       {showCreateTask && ( <Createtask tasks={tasks} setTasks={setTasks} setShowCreateTask={setShowCreateTask}/> ) }
            </div>
          <div className="container">
            <div className="row">
                {statusarr.map((status, index) => (
                    <Section  status={status}  tasks={tasks} key={index} setTasks={setTasks} setShowCreateTask={setShowCreateTask}/>
                ))}
            </div>
            
        </div>
        </div>
    );
}
export default ListTask;
const Section=({tasks,status,index,setTasks,setShowCreateTask})=>{
   
    const handleCreateTaskClick=()=>{
        setShowCreateTask(true);
        
    }
    
   
    const cards=tasks.filter((t)=>t.status===status);
    
      const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop:(item)=>addItemTOSection(item.id,status),
        collect: (monitor) => ({
          isOver: !!monitor.isOver()
        })
      }))
      
     const addItemTOSection=(id,status)=>{
         setTasks((pre)=>{
            const modified=pre.map((t)=>{
                if(t.id===id){
                    return {...t,status:status};
                }
                console.log(t.id,"is set to status ",status);
                return t;
            });
            localStorage.setItem("tasks",JSON.stringify(modified));
           
            return modified;
         })
        
     }
     const getColor=(status)=>{
         if(status=="notcompleted"){
            return "btn-danger btn-sm m-4"
         }
         if(status=="inprogress"){
            return "btn-warning btn-sm m-4"
         }
         if(status=="completed"){
            return "btn-success btn-sm m-4"
         }
     }
    
    return( 
               
                <div className="col" key={index}>
                   
                    <button type="button" className={`btn ${getColor(status)}`}>{status}</button><span className="text-danger m-4 fw-bold">{cards.length}</span>

                    <div ref={drop}>
                    {cards.map((t,index)=>{
                        return(
                        <Task task={t} tasks={tasks} name={t.name} id={t.id} key={index}/>)
                    })}
                    </div>
                   
                    <button type="button" className="btn btn-secondary m-4" onClick={handleCreateTaskClick}>+  new</button>
                   
                     
                </div>
      
       
    );
 }

 const Task=({task,tasks})=>{
    
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item:{id:task.id},
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
      }))
    
    return(
    <div className="card shadow  bg-body-tertiary rounded m-4" >
        <div className="card-body " ref={drag}>
          {task.name}
        </div>
    </div>
    )
 }
 