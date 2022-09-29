import { connect, Schema, model } from 'mongoose';
import TodoItem from '@app-todo/shared'

const TodoSchema = new Schema({
    text: String,
    timeStamps: Date
})

const TodoModel = model<TodoItem>('todoItem',TodoSchema)

export const setUpMongDB = async (url:string) => {
   await connect(url)
};

export const loadAllTodoItems = async (): Promise<TodoItem[]> => {
    
    return TodoModel.find().exec();
};

export const saveTodoItem = async (todoItem:TodoItem) => {
    const newModel = new TodoModel(todoItem);
    newModel.save();
}