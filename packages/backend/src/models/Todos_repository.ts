import { connect, Schema, model } from "mongoose";
import { TodoItem } from "@app-todo/shared";

const TodoSchema = new Schema({
  user: String,
  text: String,
  datum: String,
  hour: String,
  timeStamps: Date,
}); //den 'type' of data är MongoDb data och stämmer inte med 'TodoItem' data.

const TodoModel = model<TodoItem>("todoItem", TodoSchema);
//med model<TodoItem>, förvandlar typen av data, d.v.s från MongoDb type till typescript interface TodoItem;

export const setUpMongDB = async (url: string): Promise<void> => {
  await connect(url);
};

export const loadAllTodoItems = async (): Promise<TodoItem[]> => {
  return await TodoModel.find().sort({ timeStamps: -1 }).exec();
};

export const saveTodoItem = async (todoItem: TodoItem): Promise<TodoItem> => {
  const newModel = new TodoModel(todoItem);
  const saves = await newModel.save();
  return saves;
  // vi vill tillbaka hela objektet
};

export const deleteTodoItem = async (id: string): Promise<TodoItem | null> => {
  const deleted = await TodoModel.findByIdAndDelete(id).exec();
  console.log(deleted);
  return deleted;
};
