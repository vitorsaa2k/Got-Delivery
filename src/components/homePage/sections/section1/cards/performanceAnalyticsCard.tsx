import { Button } from "@/components/ui/button";
import { ChartBar } from "./chartBar";
import { CardWrapper } from "./cardWrapper";

export function PerfomanceAnalyticsCard() {
	return (
		<CardWrapper>
			<div className="flex flex-col gap-2">
				<ChartBar />
				<div>
					<p className="font-semibold">Análise de Desempenho</p>
					<p>
						Acompanhe métricas, identifique gargalos e otimize toda a sua
						operação com base nas entregas realizadas.
					</p>
				</div>
			</div>
			<Button>Saiba mais.</Button>
		</CardWrapper>
	);
}
