import Image from "next/image";
import LogoIcon from "../../../../public/logoIcon.png";

export function Logo() {
	return (
		<div className="bg-primary-foreground border-primary border rounded-2xl px-4 max-md:hidden">
			<div className="flex items-center gap-2">
				<Image className="max-w-[56px]" src={LogoIcon} alt="Logo" />
				<p className="text-[20px] font-bold">GotDelivery</p>
			</div>
		</div>
	);
}
