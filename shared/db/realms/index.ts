"use server";

import { prisma } from "@/shared/db";

export const getRealmsForUser = async (userId: string) => {
    const realms = await prisma.realm.findMany();
    return realms;
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
