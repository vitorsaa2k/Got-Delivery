import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";

const handler = NextAuth({
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: "jwt",
	},
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials) return null;
				const company = await prisma.company.findUnique({
					where: { email: credentials.email },
				});

				if (
					company &&
					company.password &&
					(await compare(credentials.password, company.password))
				) {
					return company;
				}
				return null;
			},
		}),
	],
	callbacks: {
		async session({ session, token }) {
			session.user.id = token.sub;
			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
