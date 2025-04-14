import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { SourceType } from "@/stores/deliveriesStore";

interface DeliverySourceTypes {
	handleSelectChange: (value: SourceType) => void;
}

export function DeliverySourceInput({
	handleSelectChange,
}: DeliverySourceTypes) {
	return (
		<>
			<label>Plataforma</label>
			<Select onValueChange={handleSelectChange}>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Plataforma" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="Ifood">Ifood</SelectItem>
					<SelectItem value="PedeAi">PedeAi</SelectItem>
					<SelectItem value="WhatsApp">WhatsApp</SelectItem>
				</SelectContent>
			</Select>
		</>
	);
}
