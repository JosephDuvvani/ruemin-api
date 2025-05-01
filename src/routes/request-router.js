import { Router } from "express";
import {
  requestsGet,
  requestPost,
  acceptRequestPost,
} from "../controllers/request.js";

const router = Router();

router.get("/", requestsGet);
router.post("/", requestPost);
router.post("/:requestId", acceptRequestPost);

export default router;
