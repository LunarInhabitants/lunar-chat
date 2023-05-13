"use server";

import { prisma } from "@/shared/db";

export const getRealmsForUser = async (userId: string) => {
    const realms = await prisma.realm.findMany({
        where: {
            userRealmSubscriptions: {
                some: {
                    userId
                }
            }
        }
    });

    return realms;
}

export const joinRealm = async (userId: string, realmId: string) => {
    const result = await prisma.userRealmSubscription.upsert({
        where: {
            realmId_userId: {
                realmId,
                userId
            }
        },
        update: {}, // Do nothing
        create: {
            userId,
            realmId
        }
    });

    return result;
}

export const leaveRealm = async (userId: string, realmId: string) => {   
    const result = await prisma.userRealmSubscription.delete({
        where: {
            realmId_userId: {
                realmId,
                userId
            }
        }
    }); 

    return result;
}

export const getPublicRealmsForAddRealmPage = async (skip?: number) => {
    const realms = await prisma.realm.findMany({
        where: {
            isPublic: true,
        },
        skip: skip,
        take: 32,
        orderBy: {
            createdAt: "desc"
        }
    });
    return realms;
}

export const createNewRealm = async (ownerId: string, displayName: string, isPublic: boolean) => {
    const newRealm = await prisma.realm.create({
        data: {
            ownerId,
            name: displayName,
            description: "",
            isPublic,
            userRealmSubscriptions: {
                create: {
                    userId: ownerId
                    // realmId is implicitly handled by Prisma
                }
            },
            channelGroups: {
                create: {
                    name: "Default Group",
                    description: "The default chat group",
                    channels: {
                        create: [
                            {
                                name: "General",
                                description: "General Discussion",
                            }
                        ]
                    }
                }
            }
        }
    });

    return newRealm;
}