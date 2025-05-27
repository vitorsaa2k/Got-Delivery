import Link from "next/link";

export function RegisterButton() {
	return (
		<Link
			href={"/register"}
			className="rounded-r-2xl text-[20px] bg-primary text-primary-foreground border border-primary font-bold rounded-l-none py-3 px-3"
		>
			Começar Teste
		</Link>
	);
}
