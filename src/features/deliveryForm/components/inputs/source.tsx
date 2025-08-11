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
				<SelectTrigger data-testid="sourceSelect" className="w-full">
					<SelectValue placeholder="Plataforma" />
				</SelectTrigger>
				<SelectContent data-testid="sourceContent">
					<SelectItem data-testid="itemIfood" value="Ifood">
						Ifood
					</SelectItem>
					<SelectItem data-testid="itemPedeai" value="PedeAi">
						PedeAi
					</SelectItem>
					<SelectItem data-testid="itemWhatsapp" value="WhatsApp">
						WhatsApp
					</SelectItem>
				</SelectContent>
			</Select>
		</>
	);
}
