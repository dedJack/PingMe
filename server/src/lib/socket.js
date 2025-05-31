
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
});

//get reciever socketId.
export const getRecieverSocketId = (userId) => {
    return userSocketMap[userId];
}

//used to store online Users.
const userSocketMap = {}; //{userId: socketId}

io.on("connection", (socket) => {
    // console.log("A user is Connected", socket.id)

    const userId = socket.handshake.query.userId;
    // console.log(userId)
    if (userId) {
        userSocketMap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        // console.log("A user is disConnected", socket.id)
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { io, httpServer, app };