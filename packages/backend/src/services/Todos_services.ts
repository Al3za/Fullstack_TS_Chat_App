import {ChatItem} from '../api-controller/Chats_Controllers-controller'
import {
  loadAllChatItems,
  saveChatItem,
} from "../models/Chats_Controllers_repository";



export const saveChat = async (ItemsChat: ChatItem): Promise<ChatItem[]> => {
  if (ItemsChat.text == "" || !ItemsChat.text) {
    throw new Error("invalid text");
  }

  await saveChatItem(ItemsChat);

  return await loadAllChatItems();
};

export const loadChat = async (): Promise<ChatItem[]> => {
  return await loadAllChatItems();
};

// export const loadItemById = async (todoId: string): Promise<ChatItem> => {
//   const item = await loadTodoItem(todoId);

//   if (!item) {
//     throw new Error(`cannot find item by id ${todoId}`);
//   }

//   return item;
// };
