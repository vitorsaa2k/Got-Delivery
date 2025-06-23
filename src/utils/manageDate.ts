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

function createDateInCorrectTimezone(date: string) {
	const correctTimeZoneDate = `${removeTimeFromDate(date)}T00:00:00-03:00`;
	return new Date(correctTimeZoneDate);
}
/**
 * Returns an ISOString date with time set to 0
 */
function getCurrentDateDefaultTime() {
	return `${removeTimeFromDate(new Date().toISOString())}T00:00:00.000Z`;
}

export {
	dateRemoveOneDay,
	dateAddOneDay,
	createDateInCorrectTimezone,
	getCurrentDateDefaultTime,
};
