import { staticsLogin } from "./models/CreateUserModel";
import { createUser } from "@app-todo/shared";

const sen: createUser = {
  username: "dany",
  password: "zeus",
};
describe("login", () => {
  test("Check User login", async () => {
    let testUserLogin = false;
    // const see = staticsLogin(sen.username, sen.password);
    const check = Mongo_User_Data.find(
      (item: createUser) => item.username === sen.username
    );
    if (check && check.password === sen.password) {
      testUserLogin = true;
    }
    expect(testUserLogin).toBeTruthy();
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
    username: "katy",
    password: "mirko",
  },
];

// const mynae = "ale";

// test("gör test", () => {
//   expect(mynae).toBe("ale");
// });

// eslint-disable-next-line no-undef
// module.exports = {
//   presets: [
//     ["@babel/preset-env", { targets: { node: "current" } }],
//     "@babel/preset-typescript",
//   ],
// };

// babel.config.js

/// babel gör så att jest kan tolka typeScript test, för jest förstår bara vanligt Js kod;
