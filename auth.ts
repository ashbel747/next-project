import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/write-client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],

  callbacks: {
    /**
     * SIGN IN CALLBACK
     */
    async signIn({ user, profile }) {
      const { name, email, image } = user;
      const githubId = profile?.id as string;
      const username = (profile as any)?.login as string;
      const bio = (profile as any)?.bio || "";

      // Fetch user from Sanity
      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: githubId });

      // If not exists, create
      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id: githubId,
          name,
          username,
          email,
          image,
          bio,
        });
      }

      return true;
    },

    /**
     * JWT CALLBACK
     */
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const githubId = profile?.id as string;

        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: githubId });

        token.id = user?._id; // Store Sanity _id in token
      }
      return token;
    },

    /**
     * SESSION CALLBACK
     */
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).id = token.id; // Attach ID to session
      }
      return session;
    },
  },
});
