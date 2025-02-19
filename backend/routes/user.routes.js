import { Router } from "express";
import { body } from "express-validator";

import { registerUserController, loginUserController, profileController, logoutController, getAllUsersController } from "../controllers/user.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

const router = Router();

router.post('/register',
    body('email').isEmail().withMessage("Email must be a valid email"),
    body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    registerUserController);

router.post('/login',
    body('email').isEmail().withMessage("Email must be a valid email"),
    body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    loginUserController);

router.get('/profile', authUser, profileController);
router.get('/logout', authUser, logoutController);
router.get('/all', authUser, getAllUsersController);

export default router;