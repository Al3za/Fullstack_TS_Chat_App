import { useState, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { TodoItem } from "@my-todo-app/shared";
import { LoginInput } from "./LoginInput";
import {
  useEventSource,
  useEventSourceListener,
} from "@react-nano/use-event-source";

axios.defaults.baseURL = process.env.APP_CHATT_API || "http://localhost:3002";

const todoDeletByItem = async (item: string | undefined) => {
  const deleteOne = await axios.get(`/todos/${item}`, {
    withCredentials: true,
  });
  if (deleteOne.status !== 400) {
    return deleteOne.data;
  }
};

type TodoAction = {
  type: "add" | "remove" | "replaceAll";
  data: TodoItem | TodoItem[] | "";
};

const TodosReducer = (state: TodoItem[], action: TodoAction) => {
  if (action.type === "add") {
    return [...state, action.data as TodoItem];
  } else if (action.type === "remove") {
    const deletedTodo = action.data as string;
    return state.filter((item) => {
      return item._id !== deletedTodo;
    });
  } else if (action.type === "replaceAll") {
    return action.data as TodoItem[];
  } else {
    throw new Error("");
  }
};

const LoadMongoData = () => {
  const [TodoTex, setTodoText] = useState<string>("");
  const [todos, dispatch] = useReducer(TodosReducer, []);
  const [error, setError] = useState<string>("");
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

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

    const response = await axios.post<TodoItem>("/todos", newTodo, {
      withCredentials: true,
    });
    dispatch({
      type: "add",
      data: response?.data || "",
    });
  };

  const deleteTodo = async (itemId: string | undefined) => {
    if (itemId) {
      const deletedTodo = await todoDeletByItem(itemId);
      dispatch({
        type: "remove",
        data: deletedTodo,
      });
    }
  };

  const performLogin = async (
    username: string,
    password: string
  ): Promise<void> => {
    const logIn = await axios.post(
      "/login",
      {
        username: username,
        password: password,
      },
      { withCredentials: true }
    );
    if (logIn.status === 200) {
      console.log("hej");
    }
    // if resp från data är (400,401,403) koden körs inte vidare
    setLoggedIn(true);
    setError("");

    const response = await axios.get<TodoItem[]>("/todos", {
      withCredentials: true,
    });
    dispatch({
      type: "replaceAll",
      data: response.data,
    });
  };

  const TodoList = ({
    todos,
    error,
  }: {
    todos: TodoItem[];
    error?: string;
  }) => {
    if (error) {
      return <div>{error}</div>;
    } else if (todos) {
      return (
        <div>
          {todos.map((item, index) => {
            return (
              <div className="render" key={index}>
                <p>{item.text}</p>{" "}
                <span onClick={(e) => deleteTodo(item._id)}>DELETE?</span>
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
