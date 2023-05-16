/* eslint-disable react/react-in-jsx-scope */
import { Routes, Route } from "react-router-dom";
import "./App.css";
import LoadMongoData from "./pages/LoadMongoData";
import { CreateUser } from "./pages/CreateUser";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<CreateUser />} />
        <Route path="/ChatData" element={<LoadMongoData />} />
      </Routes>
    </div>
  );
}

export default App;
