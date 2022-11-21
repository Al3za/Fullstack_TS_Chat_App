import { credentials } from "@app-todo/shared";
import { NextFunction, Request, Response, response, request } from "express";
import jsonwebtoken from "jsonwebtoken";
import { staticsLogin } from "../models/CreateUserModel";
require("dotenv").config();

const secret: string = process.env.Token_Secret || "YOURSECRETKEYGOESHERE";
export const JWT_COOKIE_NAME = "jwt";

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

export const fakeLogin = async (request: Request, response: Response) => {
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
};

export const loginUser = async (
  request: JwtRequest<credentials>,
  response: Response
) => {
  const credentials = request.body;

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
    response.send(token);
    // response.cookie(JWT_COOKIE_NAME, token, {
    //   expires: new Date(Date.now() + 900000),
    //   httpOnly: true,
    // });
    response.status(200);
  } else {
    response.sendStatus(401);
    //res.sendStatus(401) blockera kädjan i LoadMongoData filen, vid performLogin functionen
  }
};
