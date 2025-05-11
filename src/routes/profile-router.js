import { Router } from "express";
import {
  updateBio,
  updateName,
  updatePicture,
} from "../controllers/profile.js";

const router = Router();

router.post("/:profileId/name", updateName);
router.post("/:profileId/bio", updateBio);
router.post("/:profileId/picture", updatePicture);

export default router;
