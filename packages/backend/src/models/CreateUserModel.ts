import { model, Schema } from "mongoose";
import { createUser } from "@app-todo/shared";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require("bcrypt");

const UserModel = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserModel.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

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
};

export const User = model<createUser>("user", UserModel);

export const SaveUser = async (item: createUser): Promise<void> => {
  const SaveUser = new User(item);
  const SaveNewUser = await SaveUser.save();
  if (!SaveNewUser) {
    throw new Error();
  }
};
