import { Router } from "express";
import { chatsGet, usersGet } from "../controllers/user.js";
import guardLogin from "../middleware/guardLogin.js";

const router = Router();

router.get("/chats", guardLogin, chatsGet);
router.get("/users", guardLogin, usersGet);

export default router;
