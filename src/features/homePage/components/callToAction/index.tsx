import { CTAButton } from "./CTAButton";

export function CallToAction() {
	return (
		<div className="flex flex-col items-center gap-8">
			<div>
				<p className="flex text-[64px] font-extrabold leading-19 justify-center text-center">
					Cansado de anotar entregas no papel?
				</p>
				<p className="text-center text-[1.25rem]">
					Comece a usar GotDelivery e diga adeus ao papel e caneta.
				</p>
			</div>
			<CTAButton />
		</div>
	);
}
