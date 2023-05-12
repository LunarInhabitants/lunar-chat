"use server";

import { prisma } from "@/shared/db";

export const getRealmsForUser = async (userId: string) => {
    const realms = await prisma.realm.findMany();
    return realms;
}