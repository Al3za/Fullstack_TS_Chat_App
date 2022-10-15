import { useEffect, useState } from "react";
import axios from "axios";
//import { createUser } from "@app-todo/shared";

export const CreateUser = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [resp, setResp] = useState<string>("");

  const createUser = async () => {
    const create = await axios.post("/createUser", { username, password });
    setResp(create.data);
  };

  return (
    <div className="createUser">
      <h1> Sign in </h1>
      Username{" "}
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      Password{" "}
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={createUser}> send </button>
      {resp && resp}
    </div>
  );
};
