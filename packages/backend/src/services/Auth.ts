import { credentials } from "@app-todo/shared";
import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
require("dotenv").config();
//console.log(process.env.SECRET_KEY);

const secret: string = process.env.Token_Secret || "YOURSECRETKEYGOESHERE";

const JWT_COCKIE_NAME = "jwt";

export type TokenPayload = {
  sub: string;
  name: string;
};

export interface JwtRequest<T> extends Request<T> {
  jwt?: TokenPayload;
}

export const AutenticateToken = (
  req: JwtRequest<any>,
  res: Response,
  next: NextFunction
) => {
  const token: string | undefined = req.header("authorization")?.split(" ")[1];

  if (token) {
    try {
      const decoded = jsonwebtoken.verify(token, secret) as TokenPayload;
      req.jwt = decoded;
    } catch (err) {
      res.clearCookie(JWT_COCKIE_NAME);
      return res.sendStatus(403); // bad token
    }
  } else {
    return res.sendStatus(401); // not authorized
  }
};

const loginUser = (req: JwtRequest<credentials>, res: Response) => {
  const credentials = req.body;
  const token = jsonwebtoken.sign(
    { sub: credentials.username, name: "ale" },
    secret,
    { expiresIn: "1800s" }
  );
  res.send(token);
  return res.sendStatus(200);
};
