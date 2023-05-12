import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [],
    callbacks: {
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                },
            };
        },
        jwt: ({ token, user }) => {
            if (user) {
                const u = user as unknown as any;
                return {
                    ...token,
                    id: u.id,
                };
            }
            return token;
        }
    }
};

if(process.env.AUTH_GITHUB_ENABLED == "true") {
    authOptions.providers.push(GithubProvider({
        clientId: String(process.env.AUTH_GITHUB_ID),
        clientSecret: String(process.env.AUTH_GITHUB_SECRET),
    }));
}

if(process.env.AUTH_DISCORD_ENABLED == "true") {
    authOptions.providers.push(DiscordProvider({
        clientId: String(process.env.AUTH_DISCORD_ID),
        clientSecret: String(process.env.AUTH_DISCORD_SECRET),
    }));
}
