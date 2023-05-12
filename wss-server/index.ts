import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { prisma } from '../shared/db';
import { ChannelMessage } from "@prisma/client";


// Make sure we have a port to listen on.
const port = Number(process.env.PORT ?? process.env.LUNARCHAT_SERVER_PORT);
if(!port || isNaN(port)) {
    throw new Error(`The supplied LUNARCHAT_SERVER_PORT or PORT environment variable is missing or invalid!`);
}

if(!process.env.LUNARCHAT_CLIENT_URL) {
    throw new Error(`The supplied LUNARCHAT_CLIENT_URL environment variable is missing! Please set it to the URL for your client's local instance.`);
}

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: process.env.LUNARCHAT_CLIENT_URL,
        methods: ["GET", "POST"],
    }
});

io.on("connection", (socket: Socket) => {
    socket.on("channel:join", (channelId: string) => {
        // Todo: Auth this to see if the user can actually join this channel.
        socket.join(`channel:${channelId}`);
    });

    socket.on("channel:leave", (channelId: string) => {
        socket.leave(`channel:${channelId}`);
    });

    socket.on("msg:send", async (msg: ChannelMessage, callback: () => void) => {
        msg = await prisma.channelMessage.create({
            data: {
                owner: {
                    connect: { id: msg.ownerId }
                },
                channel: {
                    connect: { id: msg.channelId }
                },
                message: msg.message,
                extraData: msg.extraData!,
            }
        });
        
        io.to(`channel:${msg.channelId}`).emit(`msg:receive`, msg);
        callback();
    })
});

console.log(`Starting WebSockets server on port ${port} for client '${process.env.LUNARCHAT_CLIENT_URL}'...`);
httpServer.listen(port);
