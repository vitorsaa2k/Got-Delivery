import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma";

export const authOptions: AuthOptions = {
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
	},

	secret: process.env.NEXTAUTH_SECRET,
};
