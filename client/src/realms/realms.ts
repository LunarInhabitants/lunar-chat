"use server";

import { prisma } from 'lunarchat-shared/src/db/prismaClient'

export const getRealmsForUser = async (userId: string) => {
    const realms = await prisma.realm.findMany();
    return realms;
}