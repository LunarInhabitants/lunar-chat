"use server";

import { prisma } from "@/shared/db";
import { Prisma } from "@prisma/client";

export type ChannelMessageWithOwnerAndChannel = Prisma.ChannelMessageGetPayload<{
    include: { 
        owner: true ,
        channel: true,
    }
}>;

export const getMessagesInChannel = async (channelId: string) => {
    const messages = await prisma.channelMessage.findMany({
        where: {
            channelId: channelId
        },
        orderBy: {
            createdAt: "asc"
        },
        include: {
            owner: true,
        }
    }) as ChannelMessageWithOwnerAndChannel[];

    return messages;
}