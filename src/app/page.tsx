"use client";
import { removeTimeFromDate } from "@/utils/removeTimeDate";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
	const router = useRouter();
	useEffect(() => {
		router.push(
			`/delivery/date/${removeTimeFromDate(
				new Date().toISOString()
			)}T00:00:00.000Z`
		);
	}, [router]);
	return <main></main>;
}
