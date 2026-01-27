import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth/options";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
	console.log(process.env.GOOGLE_CLIENT_ID);
	throw new Error(
		"Either GoogleClientId or GoogleClientSecret was not provided"
	);
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
