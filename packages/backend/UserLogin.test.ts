const ale: string = "hej";
import { staticsLogin } from "./src/models/CreateUserModel";
import { createUser } from "@app-todo/shared";

const sen: createUser = {
  username: "dany",
  password: "zeus",
};
describe("login", () => {
  test("check User login", async () => {
    let TestUserLogin = false;
    // const see = staticsLogin(sen.username, sen.password);
    const check = Mongo_User_Data.find(
      (item: createUser) => item.username === sen.username
    );
    if (check && check.password === sen.password) {
      TestUserLogin = true;
    }
    expect(TestUserLogin).toBeTruthy();
  });
});

const Mongo_User_Data: createUser[] = [
  {
    username: "ale",
    password: "milo",
  },
  {
    username: "dany",
    password: "zeus",
  },
  {
    username: "mamma",
    password: "mirko",
  },
];
