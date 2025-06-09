import Link from "next/link";
import { ReactNode } from "react";

export function SidebarItem({
	href,
	currentUrl,
	children,
}: {
	href: string;
	currentUrl: string;
	children: ReactNode;
}) {
	const formatedUrl = href.split(`/`)[1];
	return (
		<Link
			href={href}
			className={`${
				currentUrl.includes(formatedUrl)
					? "border border-primary-foreground"
					: "border-transparent"
			} w-full p-2 rounded flex items-center border gap-2 hover:border-primary-foreground`}
		>
			{children}
		</Link>
	);
}
