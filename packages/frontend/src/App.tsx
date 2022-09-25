import React, { useEffect, useState } from 'react';
import './App.css';
import TodoItem from '@app-todo/shared'
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';

const fetchToDos = async (): Promise<TodoItem> => {
  
  const response = await axios.get<TodoItem>('/todos');
  return response.data; // when you fetch with axios the respons will often be ´res.data´ even if data is not defined
}

const CreateTodo = async (todoitem: TodoItem ):  Promise<TodoItem>  => {
  const res = await axios.post<TodoItem>('/todos', todoitem);
  return res.data;
}

function App() {  
  
  const [todo, setTodo] = useState <TodoItem | undefined>();
  const [error,setError]= useState <string | undefined> ()
  
  useEffect(() => { 
    fetchToDos().then(setTodo).catch((err) => { 
      setTodo(undefined)
      setError('connot find todos')
    })
  }, [])
  
  const output = () => {
    if (todo) {
      return todo.text;
    } else if (error) {
      return error
    } else {
      return 'loading todos'
    }
  }
     //https://github.com/Al3za/TypeScript-app-todo.git
  return (  
    <div className="App">
      <header className='App-header' >
      
        {output()}
       
     </header>
    </div>
  );
}

export default App;
