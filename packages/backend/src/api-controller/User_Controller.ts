import express, { Request, Response } from "express";
import { createUser } from "@app-todo/shared";

import SaveUser from "../models/CreateUserModel";

const Users_controller = express.Router();

Users_controller.post(
  "/",
  async (req: Request<createUser>, res: Response<createUser | string>) => {
    //const {username,password} = req.body;
    const userbody = req.body;
    console.log(userbody);
    try {
      await SaveUser(userbody), res.send("lyckad");
    } catch {
      res.send("this Username is already taken, please choose another one");
    }
  }
);

export default Users_controller;
