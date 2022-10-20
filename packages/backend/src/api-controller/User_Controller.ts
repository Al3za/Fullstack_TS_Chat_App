import express, { Request, Response } from "express";
import { createUser } from "@app-todo/shared";

import { SaveUser } from "../models/CreateUserModel";

const Users_controller = express.Router();

Users_controller.post(
  "/createUser",
  async (req: Request<createUser>, res: Response<createUser | string>) => {
    const userbody = req.body;

    try {
      await SaveUser(userbody), res.send("ok");
    } catch {
      res.send("skicka giltig data");
    }
  }
  // }
);

export default Users_controller;
