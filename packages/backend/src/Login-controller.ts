import express, { Router, Request, Response, request, response } from "express";
import jsonwebtoken from "jsonwebtoken";

const Login_controller = express.Router();

const secret: string = process.env.Token_Secret || "YOURSECRETKEYGOESHERE";
export const JWT_COOKIE_NAME = "jwt";

Login_controller.post("/", (request: Request, response: Response) => {
  console.log("biscotto test");
  const token = jsonwebtoken.sign(
    {
      sub: "alex",
      name: "alexo",
    },
    secret,
    {
      expiresIn: "1h",
    }
  );
  response.cookie(JWT_COOKIE_NAME, token, {
    expires: new Date(Date.now() + 900000),
    httpOnly: true,
  });
  response.sendStatus(200);
});

export default Login_controller;
