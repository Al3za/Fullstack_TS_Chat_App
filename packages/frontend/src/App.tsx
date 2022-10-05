import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import TodoItem from '@app-todo/shared'
import axios from 'axios';
import Users from './pages/Users';

axios.defaults.baseURL = 'http://localhost:3001';

const fetchToDos = async (): Promise<TodoItem[]> => { //funktionen kommer att returnera en array med todoItems
  
  const response = await axios.get<TodoItem[]>('/todos');
  return response.data; // when you fetch with axios the respons will often be ´res.data´ even if data is not defined
}
 

function App()  {  
  
  const [todoText, setTodoText] = useState<string>('');//vi tvingar the default värde genom att adddera strängen i parantesen 
  const [todos, setTodos] = useState <TodoItem[]>([]); //det är tack vare det här array som du kan lopa genom data 
  const [error, setError] = useState<string>('');
  const [userName,setUserName]=useState('')


  const CreateTodo = async (todoText: string): Promise<void> => {
  
    const todoItem: TodoItem = {
      text: todoText,
      timeStamps: new Date()
    };
    const getpostarray = await axios.post<TodoItem[]>("/todos", todoItem);
    setTodos(getpostarray.data) //axios uses JSON as default content type.
  }
  
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

  function addUser(item:string|undefined) {
    if (!item || item===' ' ) {
      setUserName('ange ett giltig user')
    } else {
      return setUserName(item)
    }
  };


  return (  


    <div className="App">

      <Routes>
        <Route path='/test' element={< Users  onSend={addUser} />}  />
      </Routes>

      <header className='App-header' >
      
        {output()}
       
       {userName}
      </header>
       
      <section>
       
        <input type="text" value={todoText} onChange={(e)=>setTodoText(e.target.value)} />
        <button onClick={(e) => CreateTodo(todoText)}> create todo </button>
        
      </section>
    </div>
  );
}

export default App;
