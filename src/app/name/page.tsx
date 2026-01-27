import { ChooseName } from "@/features/chooseName";
import { authOptions } from "@/lib/auth/options";
import { getCurrentDateDefaultTime } from "@/utils/manageDate";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ChooseNamePage() {
	const session = await getServerSession(authOptions);
	const redirectToDashboard = () => {
		const redirectUrl = `/delivery/date/${getCurrentDateDefaultTime()}`;
		redirect(redirectUrl);
	};
	if (!session) {
		redirect("/login");
	}
	if (session.user.name!.length > 0) {
		redirectToDashboard();
	}
	return <ChooseName />;
}
