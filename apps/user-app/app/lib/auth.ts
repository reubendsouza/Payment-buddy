import CredentialsProvider from "next-auth/providers/credentials";
import db from "@repo/db/client";

export const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      credentials: {
        phone: {
          label: "Phone number",
          type: "text",
          placeholder: "1234567890",
          required: true,
        },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials: any) {
        // Add logic here to look up the user from the credentials supplied
        const exisitngUser = await db.user.findFirst({
          where: {
            number: credentials?.phone,
            password: credentials?.password,
          },
        });
        if (exisitngUser) {
          return {
            id: exisitngUser.id.toString(),
            name: exisitngUser.name,
            email: exisitngUser.email,
          };
        }
        try {
          const user = await db.user.create({
            data: {
              number: credentials?.phone,
              password: credentials?.password,
            },
          });
          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
          };
        } catch (err) {
          console.log(err);
        }
        return null;
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async session({ token, session }: any) {
      session.user.id = token.sub;
      return session;
    },
  },
};
