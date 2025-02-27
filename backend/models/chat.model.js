import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'projects'
    },
    message: {
        type: String,
        required: true
    },
    sender: {
        required: true,
        type: Object
    }
});

const Chat = mongoose.model('chat', chatSchema);

export default Chat;