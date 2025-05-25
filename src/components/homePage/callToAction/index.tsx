import { CTAButton } from "./CTAButton";

export function CallToAction() {
	return (
		<div className="flex flex-col items-center gap-8">
			<div>
				<p className="flex text-[64px] font-extrabold leading-19 justify-center text-center">
					Entregue com inteligência.
					<br />
					Gerencie com rapidez.
				</p>
				<p className="text-center text-[1.25rem]">
					Uma única plataforma para gerenciar entregas e acompanhar seu
					desempenho.
					<br />
					Decisões inteligentes, entregas mais rápidas.
				</p>
			</div>
			<CTAButton />
		</div>
	);
}
