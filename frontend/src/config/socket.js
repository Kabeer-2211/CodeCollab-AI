import socket from 'socket.io-client'

import { store } from '@redux/store'

let socketInstance = null;

export const initializeSocket = (projectId) => {
    socketInstance = socket(import.meta.env.VITE_BASE_URL, {
        auth: {
            token: store.getState().auth.token
        },
        query: {
            projectId
        }
    });
    return socketInstance;
}

export const receiveMessage = (eventName, cb) => {
    socketInstance.on(eventName, cb);
}

export const sendMessage = (eventName, data) => {
    socketInstance.emit(eventName, data);
}