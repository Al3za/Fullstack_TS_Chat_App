import express, { Request, Response } from "express";
import createUser from '../../../shared/src/CreateUser';
import SaveUser  from '../models/CreateUserModel';

const Users_controller = express.Router();

Users_controller.post('/', async (req: Request<createUser>, res: Response<string>) => {
 
    const userBody = req.body;
    try {
        await SaveUser(userBody),
        res.send(`  hej ${userBody.user}`)
    } catch {
        res.send('this Username is already taken, please choose another one');
    }
    
   ;
})

export default Users_controller;