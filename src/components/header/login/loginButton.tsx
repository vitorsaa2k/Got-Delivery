"use client";
import { useRouter } from "next/navigation";

export function LoginButton() {
	const router = useRouter();
	return (
		<button
			onClick={() => {
				router.push("/login");
			}}
			className="bg-primary-foreground text-[20px] text-primary hover:cursor-pointer hover:bg-gray-200 rounded-r-none rounded-l-2xl border-primary border py-3 px-3"
		>
			Fazer Login
		</button>
	);
}
