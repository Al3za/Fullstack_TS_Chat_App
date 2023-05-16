//import { ChatItem } from "@app-todo/shared";
import express, {Response} from "express";
import { saveChat, loadChat  } from "../services/Todos_services";
//import { saveChatItem } from "../models/Todos_repository";
import { JwtRequest } from "../services/Auth";

export interface ChatItem {
  user?: string;
  text: string;
  datum: string;
  hour: string;
  timeStamps: Date;
}

const Chats_Controller = express.Router();

Chats_Controller.get(
  "/",
  async (req: JwtRequest<ChatItem>, res: Response<ChatItem[]>) => {
    if (req.jwt) {
      // if req.jwt är true, det betyder säkerhet kontrollen vid inloggning har passerat och att användare kan delta i chatten.
      res.send(await loadChat());
    }
  }
);

Chats_Controller.post(
  "/",
  async (req: JwtRequest<ChatItem>, res: Response<ChatItem[]>) => {
    if (!req.jwt) {
      return;
    } else {
      try {
        req.body.user = req.jwt.sub;
        // vi kan ge till en kommander object body request en istans namn som vi önskar. user i detta fall matchar med mongo user modellen, som i sin tur matchar med vår interface todo-item
        res.send(await saveChat(req.body));
      } catch (e) {
        res.sendStatus(404);
      }
    }
  }
);

export default Chats_Controller;

// todos_Controller.get(
//   "/:todoid",
//   async (req: Request, res: Response<ChatItem>) => {
//     try {
//       res.send(await loadItemById(req.params.todoid));
//     } catch (e) {
//       res.sendStatus(400);
//     }
//   }
// );
