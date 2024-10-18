import { connectDb } from "@/lib/connectDB";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";

const handler = NextAuth({
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  session: {
    strategy: "jwt", // Using JWT for session management
    maxAge: 30 * 24 * 60 * 60, // 30 days session duration
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        if (!email || !password) {
          throw new Error("Please enter both email and password.");
        }

        const db = await connectDb();
        const user = await db.collection("users").findOne({ email });

        if (!user) {
          throw new Error("No user found with this email.");
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) {
          throw new Error("Invalid password.");
        }

        // Return only required data for the session
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login", // Custom login page
    error: "/auth/error", // Error page for handling login issues
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account.provider === "credentials") {
        return true; // Allow credentials-based login
      }
      
      // Google or GitHub login
      const { email, name, image } = user;
      const db = await connectDb();
      const userCollection = db.collection("users");

      const userExist = await userCollection.findOne({ email });

      if (!userExist) {
        const newUser = {
          name,
          email,
          image,
          createdAt: new Date(),
        };
        await userCollection.insertOne(newUser);
      }

      return true; // Allow sign-in for social logins
    },
  },
  debug: true, // Enable to get better insights into errors
});

export { handler as GET, handler as POST };
