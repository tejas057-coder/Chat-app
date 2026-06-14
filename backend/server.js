const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});


// ---------seerver side-----------------
io.on("connection", (socket) => {
    console.log("User connected:", socket.id , " is online");
    
    

    socket.on("join_chat", (data) => {
        const { roomId, username } = data;

        socket.username = username;
        socket.roomId = roomId;

        socket.join(roomId);

        console.log(`${username} joined room: ${roomId}`);
    });

    socket.on("leave_chat", (roomId) => {
        socket.leave(roomId);
        console.log(`${socket.id} left room: ${roomId}`);
    });

    socket.on("send_message", (data) => {
        const { roomId, username, text } = data;

        io.to(roomId).emit("receive_message", {
            roomId,
            text,
            senderId: socket.id,
            username: data.username,
            time: new Date().toLocaleTimeString(),
        });
    });

    socket.on("leave_chat", (roomId) => {
        socket.leave(roomId);

        console.log(`${socket.username} left room ${roomId}`);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

app.get("/", (req, res) => {
    res.send("Socket.IO server is running");
});

server.listen(3001, () => {
    console.log("Server running on http://localhost:3001");
});