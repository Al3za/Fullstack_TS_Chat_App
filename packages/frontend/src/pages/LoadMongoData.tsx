import { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from '@app-todo/shared'
//import CreateTodo from './CreateTodo';

axios.defaults.baseURL = 'http://localhost:3001'

const fetchToDos = async (): Promise<TodoItem[]> => {
    const getTodo = await axios.get<TodoItem[]>('/todos');
    return getTodo.data
};

const LoadMongoData =  () => {
      
      const [TodoTex,setTodoText]=useState<string>('')
      const [todos, setTodos] = useState<TodoItem[]>([])
      const [error, setError] = useState<string>('');
    
    useEffect(() => { 
        fetchToDos().then(setTodos).catch((err) => { 
          setTodos([])
          setError('connot find todos')
        })
      }, []) 
      
      const output = () => {
        if (error) {
          return <div>{error}</div>
        } else if (todos) {
          return (
            <div>
              {todos.map((item,index) => {
                return (
                  <div key={index} >
                    <p>{item.text}</p>
                    
                  </div>
                )
              })}
            </div>
          )
        } else {
          return <p> 'waiting för todos'</p>
        }
  }  

  const addNewTodo = async (item:string) => {
    
    const newTodo: TodoItem = {
      text: item,
      timeStamps: new Date()
    };

    const response = await axios.post<TodoItem[]>('/todos', newTodo );

    setTodos(response.data);


  }

    
 

      return <>
         
        {output()}      

        <input type='string' value={TodoTex} onChange={(e) => setTodoText(e.target.value)} />
        <button onClick={(e)=> addNewTodo(TodoTex) } >send</button>
              
      </> 


}
export default LoadMongoData