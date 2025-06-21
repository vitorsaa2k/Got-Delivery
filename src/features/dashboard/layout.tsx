import { ReactNode } from "react";
import { Sidebar } from "./components/sidebar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { checkAccountIsVerified } from "@/services/verify";

export async function DashboardLayout({ children }: { children: ReactNode }) {
	const session = await getServerSession();
	if (!session) {
		redirect("/login");
	}
	const isVerified = await checkAccountIsVerified(session.user.email!);
	if (isVerified.error) {
		redirect("/verify");
	}
	return (
		<main className="flex">
			<Sidebar />
			{children}
		</main>
	);
}
