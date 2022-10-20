import { useState, useEffect } from "react";

export const UserLogin = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [resp, setResp] = useState<string>("");

  const LoginUser = () => {};

  return (
    <div className="createUser">
      <h1> Log in </h1>
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
      <button onClick={LoginUser}> send </button>
      {resp && resp}
    </div>
  );
};
