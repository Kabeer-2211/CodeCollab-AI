import { validationResult } from 'express-validator';

import { createProject, getAllProjectsByUserId, addUsersToProject, getProjectById } from '../services/project.service.js';
import User from '../models/user.model.js';

export const createProjectController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg });
    }
    try {
        const { name } = req.body;
        const loggedInUser = await User.findOne({ email: req.user.email });
        const userId = loggedInUser._id;
        const project = await createProject(name, userId);
        return res.status(200).json({ project });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export const getAllProjectsController = async (req, res) => {
    try {
        const loggedInUser = await User.findOne({ email: req.user.email });
        const projects = await getAllProjectsByUserId(loggedInUser._id);
        return res.status(200).json({ projects });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export const getProjectByIdController = async (req, res) => {
    try {
        const { projectId } = req.params;
        const project = await getProjectById(projectId);
        return res.status(200).json({ project });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export const addUserToProjectController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg });
    }
    try {
        const { users, projectId } = req.body;
        const loggedInUser = await User.findOne({ email: req.user.email });
        const updatedProject = await addUsersToProject({ projectId, users, userId: loggedInUser._id });
        return res.status(200).json({ project: updatedProject });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}