import VerifyForm from "@/features/verify";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function VerifyPage() {
	const session = await getServerSession();
	if (!session) {
		redirect("/login");
	}
	return (
		<main className="flex flex-col items-center p-8">
			<VerifyForm />
		</main>
	);
}
