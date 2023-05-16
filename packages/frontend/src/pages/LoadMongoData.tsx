/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import { ChatItem } from './'
//  // "shared/src/todo-item.ts";
import { LoginInput } from "./LoginInput";

 interface ChatItem {
  user?: string;
  text: string;
  datum: string;
  hour: string;
  timeStamps: Date;
}

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
});// varje axios request skapar en tom header object om det inte finns sparat en jwt token i vår localStorage,
// medan om vi har en token i vår localStorage så skapas en header som innehåller vår token som vi fick från vår backend när vi loggade in.

const fetchToDos = async (): Promise<ChatItem[]> => {
  const getTodo = await axios.get<ChatItem[]>("/Chat");
  return getTodo.data;
};

const TodoList = ({ todos, error }: { todos: ChatItem[]; error?: string }) => {
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
    // eslint-disable-next-line react/no-unescaped-entities
    return <p>'waiting för todos'</p>;
  }
};

const LoadMongoData = () => {
  const [TodoTex, setTodoText] = useState<string>("");
  const [todos, setTodos] = useState<ChatItem[]>([]);
  const [error, setError] = useState<string | undefined>("");
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const intervall = setInterval(() => {
    //  console.log("hej");

      fetchToDos()
        .then(setTodos)
        .catch((err) => {
          setTodos([]);
          setError("connot find todos");
        });
    }, 2000);
    return () => clearInterval(intervall);
  }, []);// här anropar vi alla klienternas meddelandet som visar till den klienten som lyckades kogga in
  // denna function anropas varje 2 sekunder för att se de senaste uppdaeringar

  const addNewTodo = async (item: string) => {
    const now = new Date();
    const datums = now.toLocaleDateString(); //string
    const hours = now.toLocaleTimeString();

    const newTodo: ChatItem = {
      text: item,
      datum: datums,
      hour: hours,
      timeStamps: new Date(),
    };

    const response = await axios.post("/Chat", newTodo);
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
    localStorage.setItem("jwt", token);
    setLoggedIn(true);
    setError("");
    const response = await axios.get<ChatItem[]>("/Chat");
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
            {/* we pass (username:string,password:string) from onLogin
              to performLogin whose have the same parameters*/}
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
