import { getCurrentDateDefaultTime } from "@/utils/manageDate";
import { useRouter } from "next/navigation";

export function useRedirectToDashboard() {
	const router = useRouter();
	return () => {
		const redirectUrl = `/delivery/date/${getCurrentDateDefaultTime()}`;
		router.push(redirectUrl);
	};
}
