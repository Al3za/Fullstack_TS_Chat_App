import  { useState } from 'react';
//import TodoItem from '@app-todo/shared';
import axios from 'axios';
//import LoadMongoData from './LoadMongoData'


axios.defaults.baseURL = "http://localhost:3001";


const CreateTodo = () => {
    
    // const [AddTodos, SetaddToTodos] = useState<TodoItem[]>([]);
     //const [todoText, setTodoText] = useState<string>('');//vi tvingar the default värde genom att adddera strängen i parantesen


    
  const TodosCreate =  (item:string) => {

    const [todoText, setTodoText] = useState<string>('');//vi tvingar the default värde genom att adddera strängen i parantesen

    return (

      <div>
        <input type={'text'} value={todoText} onChange={(e) => setTodoText(e.target.value)} />
        <button onClick={(e)=> (todoText) } >send</button>
      </div>
  )
      
    };
    
    // const getpostarray = await axios.post<TodoItem[]>("/todos", todoItem);
    // ale(getpostarray.data);
   
    //return AddTodos  
    ;
    
  
          //axios uses JSON as default content type.  
    


   
  return (<>
     
         {/* < TodosCreate onSend={function (item: string): void {
      throw new Error('Function not implemented.'); */}
  
     </>)
    
    
}

export default CreateTodo;
