import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: String(process.env.AUTH_GITHUB_ID),
      clientSecret: String(process.env.AUTH_GITHUB_SECRET),
    }),
  ]
}

const handler = NextAuth(authOptions);

export {
    handler as GET,
    handler as POST,
};
