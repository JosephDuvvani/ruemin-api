import { Router } from "express";
import { usersGet } from "../controllers/user.js";

const router = Router();

router.get("/", usersGet);

export default router;
