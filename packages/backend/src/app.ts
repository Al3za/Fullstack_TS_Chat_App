import express, { Application, json, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import todos_Controller from './api-controller/Todos-controller';
import { setUpMongDB } from './models/Todos_repository';

dotenv.config();

const app: Application = express()
app.use(cors())
app.use(json()) 
app.use('/todos',todos_Controller) 

const port: number = parseInt(process.env.SERVER_PORT || '3001')
const mongoUrl:string= process.env.SERVER_mongoUrl||'mongodb://localhost:27017/todos'

 
app.listen(port, async function () {
    await setUpMongDB(mongoUrl)
console.log(`App is listening on port ${port} !`)
})
