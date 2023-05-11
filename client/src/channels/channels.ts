"use server";

import { prisma } from 'lunarchat-shared/src/db/prismaClient'

export const getChannelGroupsForRealm = async (realmId: string) => {
    const channelGroups = await prisma.realmChannelGroup.findMany({
        where: {
            realmId: realmId
        },
        include: {
            channels: true,
        }
    });

    return channelGroups;
}