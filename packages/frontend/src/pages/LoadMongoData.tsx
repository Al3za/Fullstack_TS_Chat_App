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
// const API_ENDPOINT = process.env.APP_CHATT_API || "http://localhost:3002";

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

const API_ENDPOINT = "http://localhost:3002";

const fetchToDos = async (): Promise<TodoItem[]> => {
  const getTodo = await axios.get<TodoItem[]>("/todos");
  return getTodo.data;
};

const PostTodo = async (item: TodoItem): Promise<TodoItem> => {
  const response = await axios.post<TodoItem>("/todos", item);
  return response.data;
};

const deleteTodo = async (
  item: TodoItem | undefined
): Promise<TodoItem | null> => {
  const response = await axios.get<TodoItem>(`/todos/${item?._id}`);
  if (response.status === 200) {
    return response.data;
  } else {
    return null;
  }
};

type todoAction = {
  type: "add" | "remove" | "replaceAll";
  data: TodoItem | TodoItem[];
};

const todosReducer = (state: TodoItem[], action: todoAction) => {
  // todosReducer anropar vi med dispach functionen
  // state är den aktuella värdet. state = todos
  // state ändrar beroende på vad vi anger som type när vi anropar dispact (som nedan i vår useEffect)
  switch (action.type) {
    case "add":
      return [...state, action.data as TodoItem];
    case "remove":
      return state.filter((item) => {
        const todo = action.data as TodoItem;
        return item._id !== todo._id;
      });
    case "replaceAll":
      return action.data as TodoItem[];
    default:
      throw new Error();
  }
};

// att använda useReducer blir smidigare när app växer och man har componenter som gör olika saker fast på samma data
// i detta fall olika saker menar vi deleta, lägga till, eller hitta en object från Mongo;
// så behöver vi inte hela tiden ladda hela mongo data i en useState (setTodos) när vi för exemple addera en ny text från användaren

const LoadMongoData = () => {
  const [TodoTex, setTodoText] = useState<string>("");
  const [todos, dispatch] = useReducer(todosReducer, []);
  const [error, setError] = useState<string | undefined>("");
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [eventSource, eventSourceStatus] = useEventSource(
    `${API_ENDPOINT}/sse`,
    true
  );

  useEventSourceListener(
    eventSource,
    ["message"],
    (evt) => {
      if (evt.type === "message") {
        const added = JSON.parse(evt.data) as TodoItem;
        console.log("fick koppling");
        dispatch({
          type: "add",
          data: added,
        });
      }
    },
    []
  );

  useEffect(() => {
    fetchToDos()
      .then((todos) => {
        dispatch({
          type: "replaceAll",
          data: todos,
        });
      })
      .catch(console.error);
  }, []);

  const addNewTodo = async (TexItem: string) => {
    const now = new Date();
    const datums = now.toLocaleDateString(); //string
    const hours = now.toLocaleTimeString();

    const added = await PostTodo({
      text: TexItem,
      datum: datums,
      hour: hours,
      timeStamps: new Date(),
    });
  };

  const performLogin = async (
    username: string,
    password: string
  ): Promise<void> => {
    const loginResponse = await axios.post("/login", {
      username: username,
      password: password,
    });
    // if loginResponse.data är en status(400,401,403) koden fastnar här och körs inte vidare
    const token = loginResponse.data;
    localStorage.setItem("jwt", token);
    setLoggedIn(true);
    setError("");
  };

  const removeTodo = async (item: TodoItem) => {
    const deleted = await deleteTodo(item);
    if (deleted) {
      dispatch({
        type: "remove",
        data: item,
      });
    }
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
                <p>{item.text}</p>

                <span
                  onClick={(e) => {
                    if (item._id) removeTodo(item);
                  }}
                >
                  Delete?
                </span>

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
