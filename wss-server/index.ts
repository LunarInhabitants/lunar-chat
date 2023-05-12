import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { prisma } from '../shared/db';
import { ChannelMessageWithOwnerAndChannel } from '../src/messages';


// Make sure we have a port to listen on.
const port = Number(process.env.LUNARCHAT_SERVER_PORT ?? process.env.PORT);
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
    socket.on("msg:send", async (msg: ChannelMessageWithOwnerAndChannel, callback: () => void) => {
        msg = await prisma.channelMessage.create({
            data: {
                owner: {
                    connect: { id: msg.ownerId }
                },
                channel: {
                    connect: { id: msg.channelId }
                },
                message: msg.message,
            }
        }) as unknown as ChannelMessageWithOwnerAndChannel;
        
        if(!msg.owner) {
            const owner = await prisma.user.findFirst({
                where: {
                    id: msg.ownerId,
                }
            });

            if(owner) {
                msg.owner = owner;
            }
        }

        if(!msg.channel) {
            const channel = await prisma.realmChannel.findFirst({
                where: {
                    id: msg.channelId,
                }
            });

            if(channel) {
                msg.channel = channel;
            }
        }

        io.emit("msg:receive", msg);
        callback();
    })
});

console.log(`Starting WebSockets server on port ${port} for client '${process.env.LUNARCHAT_CLIENT_URL}'...`);
httpServer.listen(port);
