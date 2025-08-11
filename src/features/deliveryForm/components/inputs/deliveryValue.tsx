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
			<label htmlFor="deliveryValue">Valor</label>
			<Input
				className="bg-white text-black"
				type="text"
				name="deliveryValue"
				id="deliveryValue"
				data-testid="deliveryValueInput"
				value={deliveryValue}
				onChange={handleDeliveryValueChange}
			/>
		</>
	);
}
