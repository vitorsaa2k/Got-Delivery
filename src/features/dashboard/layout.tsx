import { ReactNode } from "react";
import { Sidebar } from "./components/sidebar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { checkIsAccountVerifiedSSR } from "@/lib/server/checkVerify";
import { authOptions } from "@/lib/auth/options";

export async function DashboardLayout({ children }: { children: ReactNode }) {
	const session = await getServerSession(authOptions);
	if (!session) {
		redirect("/login");
	}
	if (session.user.name === "") {
		redirect("/name");
	}
	const isVerified = await checkIsAccountVerifiedSSR(session);
	if (!isVerified.ok) {
		redirect("/verify");
	}
	return (
		<main className="flex">
			<Sidebar />
			{children}
		</main>
	);
}
