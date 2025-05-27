import { getServerSession } from "next-auth";
import { LoginButton } from "./loginButton";
import { RegisterButton } from "./registerButton";
import { redirect } from "next/navigation";
import { removeTimeFromDate } from "@/utils/removeTimeDate";

export async function LoginButtons() {
	const session = await getServerSession();
	if (session) {
		redirect(
			`/delivery/date/${removeTimeFromDate(
				new Date().toISOString()
			)}T00:00:00.000Z`
		);
	}
	return (
		<div className="flex items-center justify-center">
			<LoginButton />
			<RegisterButton />
		</div>
	);
}
