"use client";
import { Spinner } from "@/components/ui/spinner";
import { verifyAccountViaLink } from "@/services/verify";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyTokenPage() {
	const params = useParams();
	const router = useRouter();
	const [isComplete, setIsComplete] = useState(false);

	useEffect(() => {
		if (params.token) {
			verifyAccountViaLink(`${params.token}`).then(() => {
				setIsComplete(true);
				router.push("/login");
			});
		}
	}, [params, router]);
	return (
		<main className="flex flex-col items-center p-8">
			<h1 className="text-3xl font-bold">Verificando e-mail...</h1>
			<div className="bg-primary rounded-full p-2 inline-block">
				<Spinner isComplete={isComplete} isLoading />
			</div>
		</main>
	);
}
