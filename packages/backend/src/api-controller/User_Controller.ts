import express, { Request, Response } from "express";
import createUser from "@app-todo/shared/src/CreateUser";

const Users_controller = express.Router();

Users_controller.post('/', async (req: Request<createUser>, res: Response<createUser>) => {
 
    const userBody = req.body.user;
    console.log(userBody);
   
    res.send(userBody);
})

export default Users_controller;