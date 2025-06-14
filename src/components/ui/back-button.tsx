import { ArrowLeftIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

export function BackButton() {
	const router = useRouter();
	return (
		<button
			className="hover:cursor-pointer text-primary w-fit flex items-center gap-1"
			onClick={() => router.back()}
		>
			<ArrowLeftIcon size={20} />
			Voltar
		</button>
	);
}
