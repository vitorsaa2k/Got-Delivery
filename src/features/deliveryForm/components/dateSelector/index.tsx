import { DateButton } from "./dateButton";
import { LeftArrow } from "./arrows/leftArrow";
import { RightArrow } from "./arrows/rightArrow";

export function DateSelector() {
	return (
		<div className="flex gap-4 items-center">
			<LeftArrow />
			<DateButton />
			<RightArrow />
		</div>
	);
}
