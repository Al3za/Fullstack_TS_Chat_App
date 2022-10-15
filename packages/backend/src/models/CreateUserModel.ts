import { model, Schema } from "mongoose";
import { createUser } from "@app-todo/shared";

const UserModel = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true, unique: true },
});

const User = model<createUser>("user", UserModel);

const SaveUser = async (item: createUser): Promise<void> => {
  //console.log(item);
  const SaveUser = new User(item);
  const SaveNewUser = await SaveUser.save();
  if (!SaveNewUser) {
    throw new Error();
  }
};

export default SaveUser;
