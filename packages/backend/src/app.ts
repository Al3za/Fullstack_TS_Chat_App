import express, { Application, json, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import todos_Controller from "./api-controller/Todos-controller";
import Users_controller from "./api-controller/User_Controller";
import { setUpMongDB } from "./models/Todos_repository";
import { AutenticateToken, loginUser } from "./services/Auth";

dotenv.config();

const app: Application = express();
app.use(cors());
app.use(json());

app.post("/login", loginUser);
app.use("/todos", AutenticateToken);
app.use("/todos", todos_Controller);
app.use("/", Users_controller);

const port: number = parseInt(process.env.SERVER_PORT || "3002");
const mongoUrl: string =
  process.env.SERVER_mongoUrl || "mongodb://localhost:27017/todos";

app.listen(port, async function () {
  await setUpMongDB(mongoUrl);
  console.log(`App is listening on port ${port} !`);
});
