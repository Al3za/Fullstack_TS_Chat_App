import { connect, Schema, model } from 'mongoose';
import TodoItem from '@app-todo/shared'

const TodoSchema = new Schema({
    text: String,
    timeStamps: Date
}); //den 'type' of data är MongoDb data och stämmer inte med 'TodoItem' data.

const TodoModel = model<TodoItem>('todoItem', TodoSchema);
//med model<TodoItem>, förvandlar typen av data, d.v.s från MongoDb type till typescript interface TodoItem; 

export const setUpMongDB = async (url:string): Promise<void> => {
   await connect(url)
};

export const loadAllTodoItems = async (): Promise<TodoItem[]> => {
    
    return TodoModel.find().exec();
};

export const saveTodoItem = async (todoItem: TodoItem): Promise<void> => {
    const newModel = new TodoModel(todoItem);
    newModel.save();
};

export const loadTodoItem = async (id: string):Promise<TodoItem|null> => {
    return await TodoModel.findById(id).exec();
}



