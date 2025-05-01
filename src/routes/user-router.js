import { Router } from "express";
import { chatsGet, usersGet } from "../controllers/user.js";

const router = Router();

router.get("/", usersGet);
router.get("/:userId/chats", chatsGet);

export default router;
