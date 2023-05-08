import * as dotenv from 'dotenv';
import { createServer } from "http";
import { Server, Socket } from "socket.io";
dotenv.config();

const port = Number(process.env.PORT);

if(!port || isNaN(port)) {
    throw new Error(`The supplied PORT environment variable is missing or invalid!`);
}

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: process.env.CLIENT_DOMAIN,
        methods: ["GET", "POST"],
    }
});

io.on("connection", (socket: Socket) => {
    socket.on("msg:send", (msg: LunarChatMessage, callback: () => void) => {
        io.emit("msg:receive", msg);
        callback();
    })
});

console.log(`Starting WebSockets server on port ${port} for client '${process.env.CLIENT_DOMAIN}'...`);
httpServer.listen(port);
