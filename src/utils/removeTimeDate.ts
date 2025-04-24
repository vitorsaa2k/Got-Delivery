export function removeTimeFromDate(date: string) {
	return date.split("T").shift();
}
