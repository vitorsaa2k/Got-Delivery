"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID;

export function Analytics() {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		if (!GA_MEASUREMENT_ID)
			throw new Error("Google Measurement ID not provided in the .env file");
		const url = pathname + searchParams.toString();
		window.gtag?.("config", GA_MEASUREMENT_ID, {
			page_path: url,
		});
	}, [pathname, searchParams]);

	return null;
}
