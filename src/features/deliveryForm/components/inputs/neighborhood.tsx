import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";

interface NeighborhoodInputTypes {
	neighborhood: string;
	handleNeighborhoodChange: (value: ChangeEvent<HTMLInputElement>) => void;
}

export function NeighborhoodInput({
	neighborhood,
	handleNeighborhoodChange,
}: NeighborhoodInputTypes) {
	return (
		<>
			<label>Bairro</label>
			<Input
				className="bg-white text-black"
				type="text"
				name="neighborhood"
				data-testid="neighborhoodInput"
				value={neighborhood}
				onChange={handleNeighborhoodChange}
			/>
		</>
	);
}
