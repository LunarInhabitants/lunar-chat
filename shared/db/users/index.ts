"use server";

import { prisma } from "@/shared/db";

export const getUserById = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        include: {
            userRealmSubscriptions: true,
        }
    });

    return user;
}