import { TodoItem } from "@app-todo/shared";
import {
  loadAllTodoItems,
  // loadTodoItem,
  saveTodoItem,
} from "../models/Todos_repository";

export const saveTodo = async (ItemsTodo: TodoItem): Promise<TodoItem> => {
  if (ItemsTodo.text == "" || !ItemsTodo.text) {
    throw new Error("invalid todo ");
  }

  return await saveTodoItem(ItemsTodo);

  //return await loadAllTodoItems();
};

export const loadTodos = async (): Promise<TodoItem[]> => {
  return await loadAllTodoItems();
};
