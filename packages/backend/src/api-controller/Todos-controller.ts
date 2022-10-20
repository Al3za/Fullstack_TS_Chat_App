import { TodoItem } from "@app-todo/shared";
import express, { Router, Request, Response } from "express";
import { saveTodo, loadTodos, loadItemById } from "../services/Todos_services";
import { saveTodoItem } from "../models/Todos_repository";
import { JwtRequest } from "../services/Auth";

const todos_Controller = express.Router();

todos_Controller.get("/sale", (req: JwtRequest<object>, res: Response) => {
  const userrr = req.jwt;
  console.log(userrr, "ciao");
  res.send("ciao");
});

todos_Controller.get(
  "/",
  async (req: JwtRequest<TodoItem>, res: Response<TodoItem[]>) => {
    if (req.jwt) {
      console.log("ciao", req.jwt.sub);
      res.send(await loadTodos());
    }
  }
);

todos_Controller.post(
  "/",
  async (req: JwtRequest<TodoItem>, res: Response<TodoItem[]>) => {
    if (!req.jwt) {
      return;
    } else {
      try {
        req.body.user = req.jwt.sub;
        console.log(req.body);
        res.send(await saveTodo(req.body));
      } catch (e) {
        res.sendStatus(404);
      }
    }
  }
);

todos_Controller.post(
  "/user",
  async (req: Request<TodoItem>, res: Response<string>) => {
    console.log(req.body.user);
    await saveTodoItem(req.body);
    res.send("sended user name");
  }
);

export default todos_Controller;

todos_Controller.get(
  "/:todoid",
  async (req: Request, res: Response<TodoItem>) => {
    console.log(req.params.todoid);
    try {
      res.send(await loadItemById(req.params.todoid));
    } catch (e) {
      res.sendStatus(400);
    }
  }
);
