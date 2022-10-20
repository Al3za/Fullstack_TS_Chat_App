import { TodoItem } from "@app-todo/shared";
import {
  loadAllTodoItems,
  loadTodoItem,
  saveTodoItem,
} from "../models/Todos_repository";

export const saveTodo = async (ItemsTodo: TodoItem): Promise<TodoItem[]> => {
  if (ItemsTodo.text == "" || !ItemsTodo.text) {
    throw new Error("invalid todo ");
  }

  await saveTodoItem(ItemsTodo);

  return await loadAllTodoItems();
};

export const loadTodos = async (): Promise<TodoItem[]> => {
  return await loadAllTodoItems();
};

export const loadItemById = async (todoId: string): Promise<TodoItem> => {
  const item = await loadTodoItem(todoId);

  if (!item) {
    throw new Error(`cannot find item by id ${todoId}`);
  }

  return item;
};
