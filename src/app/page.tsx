"use client";
import { HomePage } from "@/components/homePage";

export default function Home() {
	/* const router = useRouter();
	useEffect(() => {
		router.push(
			`/delivery/date/${removeTimeFromDate(
				new Date().toISOString()
			)}T00:00:00.000Z`
		);
	}, [router]); */
	return <HomePage />;
}
