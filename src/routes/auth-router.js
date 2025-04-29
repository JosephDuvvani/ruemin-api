import { Router } from "express";
import { loginPost, signUpPost } from "../controllers/auth.js";

const router = Router();

router.post("/signup", signUpPost);
router.post("/login", loginPost);

export default router;
