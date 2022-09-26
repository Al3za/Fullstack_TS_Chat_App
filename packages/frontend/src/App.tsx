import React, { useEffect, useState } from 'react';
import './App.css';
import TodoItem from '@app-todo/shared'
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';

const fetchToDos = async (): Promise<TodoItem[]> => {
  
  const response = await axios.get<TodoItem[]>('/todos');
  return response.data; // when you fetch with axios the respons will often be ´res.data´ even if data is not defined
}
 

function App()  {  
  
  const [todoText, setTodoText] = useState<string>('');
  const [todos, setTodos] = useState <TodoItem[]>([]); 
  const [error, setError] = useState<string | undefined>();

  const CreateTodo = (todoText: string): void => {
  
    const todoItem: TodoItem = {
      text: todoText,
      timeStamps: new Date()
    }
    axios.post<TodoItem[]>("/todos", todoItem)
    .then((res) => setTodos(res.data)) //axios uses JSON as default content type.
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
          {todos.map((item) => {
            return (
               <p key={item.text} >{item.text} {/*item.test*/} </p>
            )
          })}
        </div>
      )
    } else {
      return <div> 'waiting för todos'</div>
    }
  }
  
  return (  
    <div className="App">
      <header className='App-header' >
      
        {output()}
       
      </header>
      <section>
        <input type="text" value={todoText} onChange={(e)=>setTodoText(e.target.value)} />
        <button onClick={(e)=>CreateTodo(todoText)}> create todo </button>
      </section>
    </div>
  );
}

export default App;
