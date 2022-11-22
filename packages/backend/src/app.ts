import express, { Application, json, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import todos_Controller from "./api-controller/Todos-controller";
import Users_controller from "./api-controller/User_Controller";
import { setUpMongDB } from "./models/Todos_repository";
import {
  AutenticateToken,
  // fakeLogin,
  JWT_COOKIE_NAME,
  loginUser,
} from "./services/Auth";
import cookieParser from "cookie-parser";
import Login_controller from "./Login-controller";

dotenv.config();

const app: Application = express();
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(json());

// app.use((request: Request, response: Response, next) => {
//   console.log("got cookie: ", request.cookies[JWT_COOKIE_NAME]);
//   next();
// });

const port: number = parseInt(process.env.SERVER_PORT || "3002");

const mongoUrl: string =
  process.env.SERVER_mongoUrl || "mongodb://localhost:27017/todos";

//app.post("/fakeLogin", fakeLogin);
app.post("/login", loginUser);
app.use("/todos", AutenticateToken);
app.use("/todos", todos_Controller);
app.use("/", Users_controller);

app.listen(port, async function () {
  await setUpMongDB(mongoUrl);
  console.log(`App is listening on port ${port} !`);
});
