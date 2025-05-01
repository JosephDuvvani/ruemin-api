import { Router } from "express";
import {
  requestsGet,
  requestPost,
  acceptRequestPost,
  rejectRequestPost,
} from "../controllers/request.js";

const router = Router();

router.get("/", requestsGet);
router.post("/", requestPost);
router.post("/:requestId/accept", acceptRequestPost);
router.post("/:requestId/reject", rejectRequestPost);

export default router;
