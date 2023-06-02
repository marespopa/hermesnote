import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";

export const authOptions: any = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  theme: {
    colorScheme: "light",
  },
};

export default NextAuth(authOptions);
