"use client";

import { DailyResumeFooter } from "./components/footer/footer";
import { DailyResumeHeader } from "./components/header";
import { MotoboyList } from "./components/motoboyList";

export function DayDeliveriesResume() {
	return (
		<div className="border rounded flex flex-col justify-between p-4 max-w-2xs w-full min-h-96 max-h-[470px]">
			<div className="flex flex-col gap-4">
				<DailyResumeHeader />
				<MotoboyList />
			</div>
			<div>
				<DailyResumeFooter />
			</div>
		</div>
	);
}
