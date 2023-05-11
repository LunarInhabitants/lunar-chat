"use server";

import { prisma } from 'lunarchat-shared/src/db/prismaClient'

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
    });

    return messages;
}