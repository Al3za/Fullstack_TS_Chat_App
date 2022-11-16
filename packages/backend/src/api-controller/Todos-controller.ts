import { TodoItem } from "@app-todo/shared";
import express, { Router, Request, Response } from "express";
import { loadTodos, } from "../services/Todos_services";
import { deleteTodoItem, saveTodoItem } from "../models/Todos_repository";
import { JwtRequest } from "../services/Auth";

const todos_Controller = express.Router();

todos_Controller.get(
  "/",
  async (req: JwtRequest<TodoItem>, res: Response<TodoItem[]>) => {
    if (req.jwt) {
      res.send(await loadTodos());
    }
  }
);

todos_Controller.post(
  "/",
  async (req: JwtRequest<TodoItem>, res: Response<TodoItem>) => {
    if (!req.jwt) {
      return;
    } else {
      try {
        req.body.user = req.jwt.sub;
        // vi kan ge till en kommander object body request en istans namn som vi önskar. user i detta fall matchar med mongo user modellen, som i sin tur matchar med vår interface todo-item
        const added = await saveTodoItem(req.body)
        res.send(added);
      } catch (e) {
        res.sendStatus(404);
      }
    }
  }
);

todos_Controller.get(
  "/:todoid",
  async (req: Request, res: Response<TodoItem|null>) => {
    const deleted = await deleteTodoItem(req.params.todoid)
    if (deleted) {
      res.send(deleted)
    } else {
      res.sendStatus(404)
    }
  }
);

export default todos_Controller;


