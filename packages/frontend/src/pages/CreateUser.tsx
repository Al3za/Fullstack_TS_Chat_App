import { useEffect, useState } from "react";
import axios from "axios";

export const CreateUser = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
    </div>
  );
};
