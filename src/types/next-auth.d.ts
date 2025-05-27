import NextAuth, { DefaultSession } from "next-auth"; //eslint-disable-line

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
		} & DefaultSession["user"];
	}

	interface User {
		id: string;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		id: string;
	}
}
