import { TodoItem } from "@app-todo/shared";
import express, { Router, Request, Response } from "express";
import { loadTodos } from "../services/Todos_services";
import { deleteTodoItem, saveTodoItem } from "../models/Todos_repository";
import { JwtRequest } from "../services/Auth";
import { sseClients } from "../app";

const todos_Controller = express.Router();

todos_Controller.get(
  "/",
  async (req: JwtRequest<TodoItem>, res: Response<TodoItem[]>) => {
    if (req.jwt) {
      res.send(await loadTodos());
    }
  }
);

todos_Controller.post("/", async (req: JwtRequest<TodoItem>, res: Response) => {
  if (!req.jwt) {
    return;
  } else {
    try {
      req.body.user = req.jwt.sub;
      // vi kan ge till en kommander object body request en istans namn som vi önskar. user i detta fall matchar med mongo user modellen, som i sin tur matchar med vår interface todo-item
      const added = await saveTodoItem(req.body);
      console.log(added);
      sseClients.forEach((c) => {
        console.log(`send nwe message to `, c.id);
        c.client.write(`event: message\n`);
        c.client.write(`data: ${JSON.stringify(added)}`);
        c.client.write(`\n\n`);
      });
      // res.send(added);
    } catch (e) {
      res.sendStatus(404);
    }
  }
});

todos_Controller.get(
  "/:todoid",
  async (req: Request, res: Response<TodoItem | null>) => {
    //console.log("hej");
    const deleted = await deleteTodoItem(req.params.todoid);
    if (deleted) {
      res.send(deleted);
    } else {
      res.sendStatus(404);
    }
  }
);

export default todos_Controller;
