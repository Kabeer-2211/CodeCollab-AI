import { Router } from "express";
import { body } from "express-validator";

import { createProjectController, getAllProjectsController, addUserToProjectController, getProjectByIdController, updateFileTreeController, getProjectChat } from "../controllers/project.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

const router = Router();

router.post('/create',
    body('name').isString().withMessage("Project name is required"),
    authUser,
    createProjectController);

router.get('/get-project/:projectId',
    authUser,
    getProjectByIdController);

router.get('/all',
    authUser,
    getAllProjectsController);

router.put('/add-user',
    body('users').isArray().withMessage("Users must be an array").custom((users) => users.every(user => typeof user === 'string')).withMessage('Each user must be a string'),
    body('projectId').isString().withMessage("Project is required"),
    authUser,
    addUserToProjectController);

router.put('/update-filetree',
    body('projectId').isString().withMessage("Project id is required"),
    body('fileTree').isObject().withMessage("File Tree is required"),
    authUser,
    updateFileTreeController);

router.get('/get-chats/:projectId', authUser, getProjectChat);

export default router;