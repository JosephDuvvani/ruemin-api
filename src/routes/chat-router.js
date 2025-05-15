import { Router } from "express";
import { chatGet, chatsGet, messagePost } from "../controllers/chat.js";

const router = Router();

router.get("/", chatsGet);
router.get("/:chatId", chatGet);
router.post("/:chatId", messagePost);

export default router;
