export function removeTimeFromDate(date: string) {
	return date.split("T").shift();
}

export function getDayFromDate(date: string) {
	return date.split("T").shift();
}
