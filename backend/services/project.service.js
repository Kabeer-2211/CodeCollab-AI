import mongoose from 'mongoose';

import Project from './../models/project.model.js';
import Chat from '../models/chat.model.js';

export const createProject = async (name, userId) => {
    if (!name) {
        throw new Error('Project name is required');
    }
    if (!userId) {
        throw new Error('User id is required');
    }

    const newProject = await Project.create({ name, users: [userId] });
    return newProject;
}

export const getAllProjectsByUserId = async (userId) => {
    if (!userId) {
        throw new Error("User id is required");
    }
    const projects = await Project.find({ users: userId });
    return projects;
}

export const addUsersToProject = async ({ projectId, users, userId }) => {
    if (!projectId) {
        throw new Error("Project id is required");
    }
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error("Invalid project id");
    }
    if (!users) {
        throw new Error("Users are is required");
    }
    if (!Array.isArray(users) || users.some(user => !mongoose.Types.ObjectId.isValid(user))) {
        throw new Error("Invalid user(s) id in user array");
    }
    if (!userId) {
        throw new Error("user id is required");
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid user id");
    }
    const project = await Project.findOne({ _id: projectId, users: userId });
    if (!project) {
        throw new Error("user does not belong to this project");
    }

    const updatedProject = await Project.findOneAndUpdate({
        _id: projectId,
    }, {
        $addToSet: {
            users: {
                $each: users
            }
        }
    }, {
        new: true
    }).populate('users');
    return updatedProject;
}

export const getProjectById = async (projectId) => {
    if (!projectId) {
        throw new Error("Project id is required");
    }
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error("Invalid project id");
    }
    const project = await Project.findOne({ _id: projectId }).populate('users');
    return project;
}

export const updateFileTree = async (projectId, fileTree) => {
    if (!projectId) {
        throw new Error("Project id is required");
    }
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error("Invalid project id");
    }
    if (!fileTree) {
        throw new Error("File tree is required");
    }
    const project = await Project.findByIdAndUpdate(projectId, { fileTree });
    return project;
}

export const getChat = async (projectId) => {
    if (!projectId) {
        throw new Error("Project id is required");
    }
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error("Invalid project id");
    }
    const chat = await Chat.find({ projectId });
    return chat;
}