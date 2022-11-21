import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { TodoItem } from "@my-todo-app/shared";
import { LoginInput } from "./LoginInput";

axios.defaults.baseURL = process.env.APP_CHATT_API || "http://localhost:3002";

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
  const [TodoTex, setTodoText] = useState<string>("");
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [error, setError] = useState<string | undefined>("");
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    //const intervall = setInterval(() => {
    console.log("hej");

    fetchToDos()
      .then(setTodos)
      .catch((err) => {
        setTodos([]);
        setError("connot find todos");
      });
    // }, 2000);
    // return () => clearInterval(intervall);
  }, []);

  const addNewTodo = async (item: string) => {
    const now = new Date();
    const datums = now.toLocaleDateString(); //string
    const hours = now.toLocaleTimeString();

    const newTodo: TodoItem = {
      text: item,
      datum: datums,
      hour: hours,
      timeStamps: new Date(),
    };

    const response = await axios.post("/todos", newTodo, {
      withCredentials: true,
    });
    setTodos(response.data);
  };

  const performLogin = async (
    username: string,
    password: string
  ): Promise<void> => {
    const loginResponse = await axios.post(
      "/login",
      {
        username: username,
        password: password,
      },
      { withCredentials: true }
    );
    const token = loginResponse.data;
    localStorage.setItem("jwt", token);
    setLoggedIn(true);
    setError("");
    const response = await axios.get<TodoItem[]>("/todos");
    setTodos(response.data);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div className="App-header">
          <TodoList todos={todos} error={error} />
          <input
            type="string"
            value={TodoTex}
            onChange={(e) => setTodoText(e.target.value)}
          />
          <button onClick={(e) => addNewTodo(TodoTex)}>send</button>
        </div>
      ) : (
        <div className="Logininput">
          <LoginInput onLogin={performLogin} />
        </div>
      )}
      <Link to={"/"}>
        <button className="link"> back sign in </button>
      </Link>{" "}
      <br /> <br />
      <button className="link" onClick={(e) => setLoggedIn(false)}>
        back to logg in
      </button>
    </div>
  );
};
export default LoadMongoData;
