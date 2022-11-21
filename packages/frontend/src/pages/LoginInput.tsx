/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";

type LoginInputProps = {
  onLogin: (username: string, password: string) => Promise<void>;
};

export const LoginInput = (props: LoginInputProps) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const attemptLogin = async () => {
    props.onLogin(username, password);
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <div>
        username:{" "}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        />
      </div>
      <div>
        Password:{" "}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
      </div>
      <div>
        <button onClick={attemptLogin}>Login</button>
      </div>
    </div>
  );
};
