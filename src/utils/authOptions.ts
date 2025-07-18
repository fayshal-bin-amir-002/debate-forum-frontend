import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    // ✅ Google Provider
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET as string,
    }),

    // ✅ Email/Password Credentials Provider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          const data = await res.json();

          if (!res.ok || !data?.data) return null;

          return {
            id: data.data.id,
            email: data.data.email,
            name: data.data.name || "Unknown",
            image: data.data.image || null,
          };
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],

  // ✅ Session and Token Handling
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.provider === "google" && profile) {
        const userInfo = {
          name: profile.name,
          email: profile.email,
          image: (profile as any).picture,
          provider: "google",
        };

        try {
          await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userInfo),
          });
        } catch (err) {
          console.error("Backend Google Register Error", err);
        }

        token.name = profile.name;
        token.email = profile.email;
        token.picture = (profile as any).picture;
      }

      return token;
    },

    async session({ session, token }) {
      session.user = {
        name: token.name,
        email: token.email,
        image: token.picture as string,
      };
      return session;
    },
  },

  // ✅ Custom Sign In Page
  pages: {
    signIn: "/auth", // your login page route
  },

  // ✅ Secure Secret
  secret: process.env.NEXTAUTH_SECRET as string,
};
