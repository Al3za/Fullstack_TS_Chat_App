/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const CreateUser = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [resp, setResp] = useState<string>("");

  const navigate = useNavigate();

  const createUser = async (e: any) => {
    e.preventDefault();

    const passw: any = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    
    if (password.match(passw)) {
      const create = await axios.post("/createUser", { username, password });
    if (create.data === "ok") {
      navigate("/ChatData");
    }
      setResp(create.data);
      // .data is how u get data from a axios request.
    } else {
      alert('Please add to password at least 1 number an a symbol')
    }
    
  };

  return (
    <div className="createUser">
      <h1> Sign in </h1>

      <form onSubmit={createUser}>
        Username{" "}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        Password{" "}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />{" "}
        <br />
        <button type="submit"> send </button>
      </form>
      {resp && resp}
      <button onClick={(e) => navigate("ChatData")}> go to logIn </button>
    </div>
  );
};
