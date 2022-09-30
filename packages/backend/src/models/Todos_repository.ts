import { connect, Schema, model } from 'mongoose';
import TodoItem from '@app-todo/shared'

const TodoSchema = new Schema({
    text: String,
    timeStamps: Date
})

const TodoModel = model<TodoItem>('todoItem',TodoSchema)

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



