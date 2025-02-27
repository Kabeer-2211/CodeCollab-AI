import "dotenv/config.js";
import http from "http";
import jwt from 'jsonwebtoken';
import { Server } from "socket.io";
import mongoose from "mongoose";
import Project from "./models/project.model.js";
import { generateResult } from "./services/ai.service.js";
import User from "./models/user.model.js";
import Chat from './models/chat.model.js';

import app from "./app.js";
import connect from "./db/db.js";
import { log } from "console";
connect();

const server = http.createServer(app);
const port = process.env.PORT;
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[1];
    const projectId = socket.handshake.query.projectId;

    if (!token) {
      return next(new Error('Authentication error'));
    }
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return next(new Error('Invalid project id'));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return next(new Error('Authentication error'));
    }
    const project = await Project.findById(projectId);
    socket.project = project;
    socket.user = decoded;
    next();
  } catch (err) {
    return next(err);
  }
});

io.on('connection', socket => {
  socket.roomId = socket.project._id.toString();
  console.log('new user connected')
  socket.join(socket.roomId);

  socket.on('project-message', async (data) => {
    const user = await User.findOne({ email: data.sender });
    await Chat.create({ projectId: socket.project._id, message: data.message, sender: { name: user.username, email: user.email } });
    io.to(socket.roomId).emit('project-message', { message: data.message, sender: { name: user.username, email: user.email } });
    const message = data.message;
    const isAiMessage = message.includes('@ai');
    if (isAiMessage) {
      const prompt = message.replace('@ai', '');
      const result = await generateResult(prompt);
      await Chat.create({ projectId: socket.project._id, message: JSON.parse(result).text, sender: { name: "AI" } });
      io.to(socket.roomId).emit('project-message', {
        sender: {
          name: "AI"
        },
        message: result
      });
    }
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
    socket.leave(socket.roomId);
  });
});

server.listen(port, () => {
  console.log(`server is running on ${port}`);
});
