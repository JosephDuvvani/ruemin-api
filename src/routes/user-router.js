import { Router } from "express";
import { userDetailsGet, usersGet } from "../controllers/user.js";

const router = Router();

router.get("/", usersGet);
router.get("/:userId/details", userDetailsGet);

export default router;
