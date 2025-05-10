import { Router } from "express";
import updateName from "../controllers/profile.js";

const router = Router();

router.post("/:profileId/name", updateName);

export default router;
