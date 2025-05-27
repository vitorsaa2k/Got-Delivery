import { Button } from "@/components/ui/button";
import { Gear } from "./gear";
import { CardWrapper } from "./cardWrapper";

export function OperationalControlCard() {
	return (
		<CardWrapper>
			<div className="flex flex-col gap-2">
				<Gear />
				<div>
					<p className="font-semibold">Controle Operacional</p>
					<p>
						Controle total com atualizações em tempo real. Gerencie pedidos e
						motoristas sem atrasos.
					</p>
				</div>
			</div>
			<Button>Saiba mais.</Button>
		</CardWrapper>
	);
}
