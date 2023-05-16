import { model, Schema } from "mongoose";
import { createUser } from "@app-todo/shared";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require("bcrypt");

const UserModel = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}); // här bygger vi vår MongoDB schema

UserModel.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
}); // vi krypterar lösenordet innan vi sparar det i databasen

export const staticsLogin = async (
  username: string,
  password: string
): Promise<createUser | undefined> => {
  const check = await User.findOne({ username });
  if (check && (await bcrypt.compare(password, check.password))) {
    return check;
  } else {
    return undefined;
  }
}; // här tittar vi om den username och password som vi anger vid inloginingen finns i databasen,


export const User = model<createUser>("user", UserModel);
// här anger namnet till vår collection i mongoDB

export const SaveUser = async (item: createUser): Promise<void> => {
  const SaveUser = new User(item);
  const SaveNewUser = await SaveUser.save();
  if (!SaveNewUser) {
    throw new Error();
  }
}; // här sparar vi Klienten credentials i databasen.
