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
} // vi fixar en personligt reqest (req) namn som vi nämnar JwtRequest.

export const AutenticateToken = (
  req: JwtRequest<any>,
  res: Response,
  next: NextFunction
) => {
  const token: string | undefined = req.header("authorization")?.split(" ")[1];
  // om inloggningen gick bra så skapas i vår frontend en token som sparas i localStorage under header namnet "authorization" 
  if (token) {
    try {
      // vi tar den header och kör en "token verify"
      const decoded = jsonwebtoken.verify(token, secret) as TokenPayload;
      // verify verifierar att token och secret stämmer.
      req.jwt = decoded;
      // om det stämmer, vår req.jwt innehåller den Jwt token som an användare behöver för att delta i chatten
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
  ); // vi skickar denna data för att se om den username och password som vi anger vid inloginingen finns i databasen,
  // och om det finns skapar vi en Jwt token som skickas till klienten i frontend servern
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
