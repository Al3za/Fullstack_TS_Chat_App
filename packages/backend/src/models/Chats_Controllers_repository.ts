import { connect, Schema, model } from "mongoose";
import { ChatItem } from "../api-controller/Chats_Controllers-controller"

const ChatSchema = new Schema({
  user: String,
  text: String,
  datum: String,
  hour: String,
  timeStamps: Date,
}); //den 'type' of data är MongoDb data och stämmer inte med 'TodoItem' data.


const ChatModel = model<ChatItem>("Chat-App", ChatSchema);
//med model<TodoItem>, förvandlar typen av data, d.v.s från MongoDb type till typescript interface TodoItem;

export const setUpMongDB = async (url: string): Promise<void> => {
  await connect(url);
};

export const loadAllChatItems = async (): Promise<ChatItem[]> => {
  return await ChatModel.find().sort({ timeStamps: -1 }).exec();
};

export const saveChatItem = async (chatItem: ChatItem): Promise<void> => {
  const newModel = new ChatModel(chatItem);
  await newModel.save();
};

// export const loadchatItem = async (id: string): Promise<ChatItem | null> => {
//   return await ChatModel.findById(id).exec();
// };
