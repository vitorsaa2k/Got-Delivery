import { ReactNode } from "react";
import { Sidebar } from "./components/sidebar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function DashboardLayout({ children }: { children: ReactNode }) {
	const session = await getServerSession();
	if (!session) {
		redirect("/login");
	}
	return (
		<main className="flex">
			<Sidebar />
			{children}
		</main>
	);
}
