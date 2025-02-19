import { Router } from "express";

import { getResult } from "../controllers/ai.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

const router = Router();

router.get('/get-result', authUser, getResult);

export default router;