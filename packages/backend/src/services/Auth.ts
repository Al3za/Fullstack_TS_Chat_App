import { credentials } from "@app-todo/shared";
import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { staticsLogin } from "../models/CreateUserModel";

const secret: string = process.env.Token_Secret || "YOURSECRETKEYGOESHERE";

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
      // verify är det du gör i Jwt.io den verifierar att token och secret stämmer.
      req.jwt = decoded;
    } catch (err) {
      return res.sendStatus(403); // bad token
    }
  } else {
    return res.sendStatus(401); // not authorized
  }

  next();
};

export const loginUser = async (
  req: JwtRequest<credentials>,
  res: Response
) => {
  const credentials = req.body;

  const getUser = await staticsLogin(
    credentials.username,
    credentials.password
  );
  if (getUser) {
    const token = jsonwebtoken.sign(
      { sub: credentials.username, name: "alex" },
      secret,
      {
        expiresIn: "1800s",
      }
    );
    res.send(token);
  } else {
    res.sendStatus(401);
    //res.sendStatus(401) blockera kädjan i LoadMongoData filen, vid performLogin functionen
  }
};
