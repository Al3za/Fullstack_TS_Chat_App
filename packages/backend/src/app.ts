import express, { Application,json,Request, Response } from 'express'
import cors from 'cors'
import TodoItem from '@app-todo/shared' // med '../'  går man ut från den folder du befinner dig
import Crypto from 'crypto'; //ger en väldig bra random id
import dotenv from 'dotenv';
import { loadAllTodoItems, saveTodoItem, setUpMongDB } from './db';

dotenv.config();

const app: Application = express()
app.use(cors())
app.use(json())  

const port: number = parseInt(process.env.SERVER_PORT || '3001')
const mongoUrl:string= process.env.SERVER_mongoUrl||'mongodb://localhost:27017/todos'

 app.get('/todos', async (req: Request<TodoItem[]> , res: Response<TodoItem[] >) => {
     const TODO_ITEMS = await loadAllTodoItems();
     res.send(TODO_ITEMS)
 })

app.post('/todos', async (req: Request<TodoItem> , res: Response<TodoItem[]>) => {
    
    const ItemsTodo = req.body;
    const saved = await saveTodoItem(ItemsTodo);
    console.log(`got new todo item `, ItemsTodo);
    const todoItems = await loadAllTodoItems();
    res.send(todoItems);
     // datan som klienten skickar visar ingen hänsyn till typescript.
    //typescript korrigera dig om du skriver nåt som inte passar parameterna, men inte klienten.
    //den som klienten skickar in bli betraktad som vanligt java skript, och bryter typeScript reglerna;
    //res.sendStatus(201) //201 betyder man har skapat nåt nytt, i detta fall en new todos item
    
}) //curl -v -H "Content-Type:application/json" -d '{"text":"ciao ale", "timeStamps":"2022-09-24T20:54:55.016Z"}' http://localhost:3001/todos


app.listen(port, async function () {
    await setUpMongDB(mongoUrl)
console.log(`App is listening on port ${port} !`)
})
//27 min video