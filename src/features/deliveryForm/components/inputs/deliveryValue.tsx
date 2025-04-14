import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";
interface DeliveryValueInputTypes {
	deliveryValue: string;
	handleDeliveryValueChange: (value: ChangeEvent<HTMLInputElement>) => void;
}

export function DeliveryValueInput({
	deliveryValue,
	handleDeliveryValueChange,
}: DeliveryValueInputTypes) {
	return (
		<>
			<label>Valor</label>
			<Input
				className="bg-white text-black"
				type="text"
				name="deliveryValue"
				value={deliveryValue}
				onChange={handleDeliveryValueChange}
			/>
		</>
	);
}
