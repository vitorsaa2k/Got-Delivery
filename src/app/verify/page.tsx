import VerifyForm from "@/features/verify";
import { checkAccountIsVerified } from "@/services/verify";
import { getCurrentDateDefaultTime } from "@/utils/manageDate";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function VerifyPage() {
	const session = await getServerSession();
	if (!session) {
		redirect("/login");
	}
	const isVerified = await checkAccountIsVerified(session.user.email!);
	if (isVerified.data) {
		redirect(`/delivery/date/${getCurrentDateDefaultTime()}`);
	}
	return (
		<main className="flex flex-col items-center p-8">
			<VerifyForm />
		</main>
	);
}
