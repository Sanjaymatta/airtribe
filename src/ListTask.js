import { useEffect, useState } from "react";

const ListTask=({tasks,SetTasks})=>{
    const [start,setStart]=useState([]);
    const [progress,setProgress]=useState([]);
    const [completed,setCompleted]=useState([]);
    useEffect(()=>{
        const fStart=tasks.filter((task)=>task.status==="notcompleted");
        const fInProgress=tasks.filter((task)=>task.status==="inprogress");
        const fCompleted=tasks.filter((task)=>task.status==="completed");
        setStart(fStart);
        setProgress(fInProgress);
        setCompleted(fCompleted);
    },[tasks]);
    
 
    const statusarr=["notcompleted","inprogress","completed"];
    return(
        <div>
           
          <div className="container">
            <div className="row">
                {statusarr.map((status, index) => (
                    <Section  status={status}  tasks={tasks}/>
                ))}
            </div>
            
        </div>
        </div>
    );
}
export default ListTask;
const Section=({tasks,status})=>{
    const cards=tasks.filter((t)=>t.status===status);
    
    return( 
               
                <div className="col">
                    {/* <div className="card">
                        <div className="card-body shadow bg-body rounded">
                                {status} {cards.length}
                        </div>
                    </div> */}
                    <button type="button" className="btn btn-primary">{status}</button><span className="text-danger m-4 fw-bold">{cards.length}</span>
                    {cards.map((t)=>{
                        return(
                            <div className="card m-4">
                                <div className="card-body shadow bg-body rounded">
                                      {t.name}
                                    </div>
                            </div>
                        );
                    })}
                    
                </div>
      
       
    );
}