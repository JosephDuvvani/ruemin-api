import { Router } from "express";
import {
  loginPost,
  logoutPost,
  refreshToken,
  signUpPost,
} from "../controllers/auth.js";

const router = Router();

router.post("/signup", signUpPost);
router.post("/login", loginPost);
router.post("/token", refreshToken);
router.post("/logout", logoutPost);

export default router;
