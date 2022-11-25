import express, { Application, json, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import todos_Controller from "./api-controller/Todos-controller";
import Users_controller from "./api-controller/User_Controller";
import { setUpMongDB } from "./models/Todos_repository";
import { AutenticateToken, loginUser } from "./services/Auth";
import cookieParser from "cookie-parser";
//import http, { request } from "http";
//import { randomUUID } from "crypto";

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

//const server = http.createServer(app);
// an http server that contain our express app server framework

const port: number = parseInt(process.env.SERVER_PORT || "3002");

// type SSeClient = {
//   id: string;
//   client: Response;
// };

// export const sseClients: SSeClient[] = [];

// app.use("/sse", async (request: Request, response: Response) => {
//   // default endpoint when u use sse
//   const headers = {
//     "Content-Type": "text/event-stream",
//     Connection: "keep-alive",
//     "Cache-Control": "no-cache",
//   };
//   // sse headers som skickas till klienten
//   response.writeHead(200, headers);
//   console.log("server connected");
//   const clientRandomId = randomUUID();
//   const newClient = {
//     id: clientRandomId,
//     client: response,
//   };
//   sseClients.push(newClient);

//   console.log("got new client", clientRandomId);

//   // för varje ny användare skapas en unique klient
//   // det skapas varje gång en ny klient öppnar vår chat app, för att när man oppnar appen,
//   // då anropar vi /sse i vår frontend och så skapas en ny användare
//   // så varje klienter som skapar öppnar appen är unique/annorlunda

//   request.on("close", () => {
//     console.log(`${clientRandomId} Connection closed`);
//     sseClients.filter((c) => c.id !== clientRandomId);
//   }); // vi rensar användare id när hen loggar ut från appen
// });

const mongoUrl: string =
  process.env.SERVER_mongoUrl || "mongodb://localhost:27017/todos";

app.post("/login", loginUser);
app.use("/todos", AutenticateToken);
app.use("/todos", todos_Controller);
app.use("/", Users_controller);

app.listen(port, async function () {
  await setUpMongDB(mongoUrl);
  console.log(`App is listening on port ${port} !`);
});
