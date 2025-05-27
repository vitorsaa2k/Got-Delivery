import Link from "next/link";

export function CTAButton() {
	return (
		<div className="flex flex-col items-center">
			<Link
				href={`/register`}
				className="p-4 bg-primary font-bold text-primary-foreground rounded-[16px] text-2xl"
			>
				Comece Agora!
			</Link>
			<p className="text-[#757575]">100% de graça.</p>
		</div>
	);
}
