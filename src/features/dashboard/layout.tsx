import { ReactNode } from "react";
import { Sidebar } from "./components/sidebar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { checkIsAccountVerifiedSSR } from "@/lib/server/checkVerify";

export async function DashboardLayout({ children }: { children: ReactNode }) {
	const session = await getServerSession();
	if (!session) {
		redirect("/login");
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
