import TodoItem from "@app-todo/shared";
import express, { Router,Request,Response } from "express";
import { saveTodo, loadTodos, loadItemById } from '../services/Todos_services'

const todos_Controller = express.Router(); 

todos_Controller.get('/', async (req: Request<TodoItem>, res: Response<TodoItem[]>) => {
    res.send( await loadTodos());
});

todos_Controller.get('/:todoid', async (req: Request, res: Response<TodoItem>) => {
    try {
        res.send(await loadItemById(req.params.todoid))
    } catch (e) {
        res.sendStatus(400)
    }

});

todos_Controller.post('/', async (req: Request<TodoItem>, res: Response<TodoItem[]>) => {

    try {
        res.send(await saveTodo(req.body));
    } catch (e) {
        res.sendStatus(404)
    };

});


export default todos_Controller;