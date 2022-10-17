import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { TodoItem } from "@app-todo/shared";
import { UseGlobalContext } from "../pages/Context_learning";
import { LoginInput } from "./LoginInput";

axios.defaults.baseURL = "http://localhost:3001";

axios.interceptors.request.use((config) => {
  if (!config.headers) {
    config.headers = {};
  }
  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    config.headers["authorization"] = `Bearer ${jwt}`;
  }
  return config;
});

const fetchToDos = async (): Promise<TodoItem[]> => {
  const getTodo = await axios.get<TodoItem[]>("/todos");
  return getTodo.data;
};

const TodoList = ({ todos, error }: { todos: TodoItem[]; error?: string }) => {
  if (error) {
    return <div>{error}</div>;
  } else if (todos) {
    return (
      <div>
        {todos.map((item, index) => {
          return (
            <div className="render" key={index}>
              <p>{item.text}</p>
              <p>{"från : " + item.user}</p>
              <p>
                {item.datum} {item.hour}
              </p>
              <br />
            </div>
          );
        })}
      </div>
    );
  } else {
    return <p> 'waiting för todos'</p>;
  }
};

const LoadMongoData = () => {
  const { userName } = UseGlobalContext();
  const [TodoTex, setTodoText] = useState<string>("");
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [error, setError] = useState<string | undefined>("");
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const intervall = setInterval(() => {
      fetchToDos()
        .then(setTodos)
        .catch((err) => {
          setTodos([]);
          setError("connot find todos");
        });
    }, 2000);
    return () => clearInterval(intervall);
  }, []);

  const addNewTodo = async (item: string) => {
    const now = new Date();
    const datums = now.toLocaleDateString(); //string
    const hours = now.toLocaleTimeString();

    const newTodo: TodoItem = {
      user: userName,
      text: item,
      datum: datums,
      hour: hours,
      timeStamps: new Date(),
    };

    //console.log(newTodo);
    const response = await axios.post<TodoItem[]>("/todos", newTodo);
    setTodos(response.data);
  };

  const performLogin = async (
    username: string,
    password: string
  ): Promise<void> => {
    const loginResponse = await axios.post("/login", {
      username: username,
      password: password,
    });
    const token = loginResponse.data;
    console.log(token, "token here");
    localStorage.setItem("jwt", token);
    setLoggedIn(true);
    setError("");
    const response = await axios.get<TodoItem[]>("/todos");
    setTodos(response.data);
  };

  return (
    <>
      {isLoggedIn ? (
        <TodoList todos={todos} error={error} />
      ) : (
        <LoginInput onLogin={performLogin} />
      )}

      <input
        type="string"
        value={TodoTex}
        onChange={(e) => setTodoText(e.target.value)}
      />
      <button onClick={(e) => addNewTodo(TodoTex)}>send</button>
      <Link to={"/"}>
        <button> back sign in </button>
      </Link>

      <button onClick={(e) => setLoggedIn(false)}> logg in </button>
    </>
  );
};
export default LoadMongoData;
