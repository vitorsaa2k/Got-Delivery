import { DashboardHome } from "@/features/dashboard";
import { DashboardLayout } from "@/features/dashboard/layout";

export default function DashboardPage() {
	return (
		<DashboardLayout>
			<DashboardHome />
		</DashboardLayout>
	);
}
