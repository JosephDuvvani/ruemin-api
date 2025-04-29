import { Router } from "express";
import { loginPost, refreshToken, signUpPost } from "../controllers/auth.js";

const router = Router();

router.post("/signup", signUpPost);
router.post("/login", loginPost);
router.post("/token", refreshToken);

export default router;
