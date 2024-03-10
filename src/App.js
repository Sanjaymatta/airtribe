import 'bootstrap/dist/css/bootstrap.min.css';
import Createtask from './CreateTask';
import {Toaster} from "react-hot-toast";
import { useEffect, useState } from 'react';
import ListTask from './ListTask';
import { DndProvider } from 'react-dnd'
import Delete from './Delete';
import { HTML5Backend } from 'react-dnd-html5-backend'
function App() {
  const[tasks,setTasks]=useState([]);
 
  useEffect(()=>{
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  },[]);
  return( 
    <DndProvider backend={HTML5Backend}>
     <Toaster />
      <div>
      
      <ListTask tasks={tasks} setTasks={setTasks} /> 
      
      </div>
      </DndProvider>
  ); 
}
export default App;
