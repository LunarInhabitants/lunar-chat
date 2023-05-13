"use server";

import { prisma } from "@/shared/db";
import { Prisma } from "@prisma/client";

export type ChannelGroupsWithChannels = Prisma.RealmChannelGroupGetPayload<{
    include: { channels: true }
}>;

export const getChannelGroupsForRealm = async (realmId: string) => {
    const channelGroups: ChannelGroupsWithChannels[] = await prisma.realmChannelGroup.findMany({
        where: {
            realmId: realmId
        },
        include: {
            channels: true,
        }
    });

    return channelGroups;
}