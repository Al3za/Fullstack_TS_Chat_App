import express, {
  Application,
  json,
  Request,
  Response,
  Express,
} from "express";
import cors from "cors";
import dotenv from "dotenv";
import todos_Controller from "./api-controller/Todos-controller";
import Users_controller from "./api-controller/User_Controller";
import { setUpMongDB } from "./models/Todos_repository";
import { AutenticateToken, loginUser } from "./services/Auth";
import http, { request } from "http";
import { randomUUID } from "crypto";

dotenv.config();

const CORS_ORIGIN = ["http://localhost:3000"];
// vi komunicerar med frontend Sse tack vare CORS_ORIGIN

const app: Express = express();
app.use(json());
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);

const server = http.createServer(app);
const port: number = 3002;

type SseClient = {
  id: string;
  client: Response;
};
export let sseClients: SseClient[] = [];

app.use("/sse", async (request: Request, response: Response) => {
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };
  // headers som skickas till klienten
  response.writeHead(200, headers);

  console.log("server connected");
  const clientRandomId = randomUUID();
  const newClient = {
    id: clientRandomId,
    //id: jwt?.sub || "anonymus",
    client: response,
  };
  sseClients.push(newClient);

  console.log("got new SSE client", clientRandomId);

  request.on("close", () => {
    console.log(`${clientRandomId} Connection closed`);
    sseClients = sseClients.filter((c) => c.id !== clientRandomId);
  });
});

app.post("/login", loginUser);
app.use("/todos", AutenticateToken);
app.use("/todos", todos_Controller);
app.use("/", Users_controller);

const mongoUrl: string =
  process.env.SERVER_mongoUrl || "mongodb://localhost:27017/todos";

server.listen(port, async function () {
  await setUpMongDB(mongoUrl);
  console.log(`App is listening on port ${port} !`);
});
