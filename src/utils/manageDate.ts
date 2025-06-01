import { removeTimeFromDate } from "./removeTimeDate";

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

function createDateInCorrectTimezone(date: string) {
	const correctTimeZoneDate = `${removeTimeFromDate(date)}T00:00:00-03:00`;
	return new Date(correctTimeZoneDate);
}

export { dateRemoveOneDay, dateAddOneDay, createDateInCorrectTimezone };
