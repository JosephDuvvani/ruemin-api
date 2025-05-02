import { Router } from "express";
import { chatsGet, messagePost } from "../controllers/chat.js";

const router = Router();

router.get("/", chatsGet);
router.post("/:chatId", messagePost);

export default router;
