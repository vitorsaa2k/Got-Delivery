import { removeTimeFromDate } from "./formatDate";

function dateAddOneDay(date: string): string {
	const currentDate = new Date(
		`${removeTimeFromDate(decodeURIComponent(date))}`
	);
	const nextDay = currentDate;
	nextDay.setDate(nextDay.getDate() + 1);
	return new Date(nextDay).toISOString();
}

function dateRemoveOneDay(date: string): string {
	const currentDate = new Date(
		`${removeTimeFromDate(decodeURIComponent(date))}`
	);
	const nextDay = currentDate;
	nextDay.setDate(nextDay.getDate() - 1);
	return new Date(nextDay).toISOString();
}

export { dateRemoveOneDay, dateAddOneDay };
