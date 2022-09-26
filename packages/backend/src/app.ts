import express, { Application,json,Request, Response } from 'express'
import cors from 'cors'
import TodoItem from '@app-todo/shared' // med '../'  går man ut från den folder du befinner dig
import Crypto from 'crypto'; //ger en väldig bra random id

const app: Application = express()
app.use(cors())
app.use(json())  

const port: number = parseInt(process.env.SERVER_PORT || '3001')

const TODO_ITEMS: TodoItem[] = [  //before was TodoItem en object, but now we choosed to turn that into an array. 
    {
    id: '123',
    text: 'ciao',
    timeStamps: new Date()
    }
];

 app.get('/todos', (req: Request<TodoItem[]> , res: Response<TodoItem[] >) => {
     res.send( TODO_ITEMS )
 })

app.post('/todos', (req: Request<TodoItem> , res: Response<TodoItem[]>) => {
    
    const ItemsTodo = req.body;
    ItemsTodo.id = Crypto.randomUUID();
    console.log(`got new todo item `, ItemsTodo)
    TODO_ITEMS.push(ItemsTodo)
     // datan som klienten skickar visar ingen hänsyn till typescript. 
    //typescript korrigera dig om du skriver nåt som inte passar parameterna, men inte klienten.
    //den som klienten skickar in bli betraktad som vanligt java skript, och bryter typeScript reglerna;
    //res.sendStatus(201) //201 betyder man har skapat nåt nytt, i detta fall en new todos item
    res.send(TODO_ITEMS)
    
}) //curl -v -H "Content-Type:application/json" -d '{"text":"ciao ale", "timeStamps":"2022-09-24T20:54:55.016Z"}' http://localhost:3001/todos


app.listen(port, function () {
console.log(`App is listening on port ${port} !`)
})
//27 min video