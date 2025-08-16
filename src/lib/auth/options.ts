import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "../prisma";
import { handleGoogleLogin } from "./googleLogin";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
	console.log(process.env.GOOGLE_CLIENT_ID);
	throw new Error(
		"Either GoogleClientId or GoogleClientSecret was not provided"
	);
}

export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma) as AuthOptions["adapter"],
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
				if (!credentials?.email || !credentials.password)
					throw new Error("Preencha todos os campos");
				const company = await prisma.company.findUnique({
					where: { email: credentials.email },
				});
				if (!company) {
					throw new Error("Não existe uma conta com este e-mail");
				}

				if (
					company &&
					company.password &&
					(await compare(credentials.password, company.password))
				) {
					return company;
				}
				throw new Error("Senha incorreta");
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	callbacks: {
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.sub ?? token.id;
			}
			return session;
		},
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		async signIn({ user, account }) {
			if (account?.provider === "google") await handleGoogleLogin(user);
			return true;
		},
	},

	secret: process.env.NEXTAUTH_SECRET,
};
