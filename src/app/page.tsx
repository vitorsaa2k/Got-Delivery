import { HomePage } from "@/features/homePage";
import { removeTimeFromDate } from "@/utils/removeTimeDate";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
	const session = await getServerSession();
	if (session) {
		redirect(
			`/delivery/date/${removeTimeFromDate(
				new Date().toISOString()
			)}T00:00:00.000Z`
		);
	}
	return <HomePage />;
}
