import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

function getDateRange(day: string) {
	const parsedDate = day.split("T").shift();
	if (parsedDate === undefined)
		return { start: new Date(), end: new Date(), error: true };
	const start = new Date(parsedDate);
	const end = new Date(parsedDate);
	end.setDate(end.getDate() + 1);
	return { start, end };
}

export async function GET(
	req: NextRequest,
	{ params }: { params: { date: string } }
) {
	const { date } = await params;
	const { start, end, error } = getDateRange(await date);
	if (error) return NextResponse.json({ error });
	const deliveries = await prisma.delivery.findMany({
		where: {
			date: {
				gte: start,
				lt: end,
			},
		},
		include: {
			motoboy: true,
		},
	});
	return NextResponse.json({ deliveries, error });
}
