import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//import { createUser } from "@app-todo/shared";

export const CreateUser = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [resp, setResp] = useState<string>("");

  const navigate = useNavigate();

  const createUser = async (e: any) => {
    e.preventDefault();
    const create = await axios.post("/createUser", { username, password });
    if (create.data === "ok") {
      navigate("/todos");
    }
    setResp(create.data);
  };

  // const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

  return (
    <div className="createUser">
      <h1> Sign in </h1>

      <form onSubmit={createUser}>
        Username{" "}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          // pattern="a-zA-Z0-9"
          // required
          // title="user ska ha upper and lower case pluss number"
        />
        <br />
        Password{" "}
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />{" "}
        <br />
        <button type="submit"> send </button>
      </form>
      {resp && resp}
    </div>
  );
};
