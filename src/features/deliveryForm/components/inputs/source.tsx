import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { SourceType } from "@/types/global/types";

interface DeliverySourceTypes {
	value?: SourceType;
	handleSelectChange: (value: SourceType) => void;
}

export function DeliverySourceInput({
	value,
	handleSelectChange,
}: DeliverySourceTypes) {
	return (
		<>
			<label>Plataforma</label>
			<Select value={value} onValueChange={handleSelectChange}>
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
