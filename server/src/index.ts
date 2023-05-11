import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { prisma } from 'lunarchat-shared/src/db/prismaClient.js';
import { ChannelMessageWithOwnerAndChannel } from 'lunarchat-shared';
import type { ChannelMessage } from '@prisma/client';

// Setup .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.normalize(`${__dirname}/../../.env`) });

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
        });
        
        if(!msg.owner) {
            msg.owner = await prisma.user.findFirst({
                where: {
                    id: msg.ownerId,
                }
            });
        }

        if(!msg.channel) {
            msg.channel = await prisma.realmChannel.findFirst({
                where: {
                    id: msg.channelId,
                }
            });
        }

        io.emit("msg:receive", msg);
        callback();
    })
});

console.log(`Starting WebSockets server on port ${port} for client '${process.env.LUNARCHAT_CLIENT_URL}'...`);
httpServer.listen(port);
