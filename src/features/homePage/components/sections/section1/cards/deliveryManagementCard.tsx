import Image from "next/image";
import entrega from "../../../../../../../public/entrega.png";
import { Button } from "@/components/ui/button";
import { CardWrapper } from "./cardWrapper";
export function DeliveryManagementCard() {
	return (
		<CardWrapper>
			<div className="flex flex-col gap-2">
				<Image className="max-w-19" src={entrega} alt="entregaPng" />
				<div>
					<p className="font-semibold">Gestão de Entregas</p>
					<p>
						Crie, acompanhe, edite e remova suas entregas à qualquer momento e
						em qualquer dispositivo.
					</p>
				</div>
			</div>
			<Button>Saiba mais.</Button>
		</CardWrapper>
	);
}
