import VerifyForm from "@/features/verify";
import { checkIsAccountVerifiedSSR } from "@/lib/server/checkVerify";
import { getCurrentDateDefaultTime } from "@/utils/manageDate";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function VerifyPage() {
	const session = await getServerSession();
	if (!session) {
		redirect("/login");
	}
	const isVerified = await checkIsAccountVerifiedSSR(session);
	if (isVerified.ok) {
		redirect(`/delivery/date/${getCurrentDateDefaultTime()}`);
	}
	return (
		<main className="flex flex-col items-center p-8">
			<VerifyForm />
		</main>
	);
}
