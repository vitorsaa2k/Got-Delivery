import prisma from "@/lib/prisma";
import { removeTimeFromDate } from "@/utils/formatDate";
import { NextRequest, NextResponse } from "next/server";

function getDateRange(day: string) {
	const parsedDate = removeTimeFromDate(day);
	if (parsedDate === undefined)
		return { start: new Date(), end: new Date(), error: true };
	const start = new Date(parsedDate);
	const end = new Date(parsedDate);
	end.setDate(end.getDate() + 1);
	return { start, end };
}

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ date: string }> }
) {
	const { date } = await params;
	const { start, end, error } = getDateRange(date);

	const { searchParams } = new URL(req.url);
	const id = searchParams.get("id");
	if (!id)
		return NextResponse.json({
			error: "companyId was not provided",
		});
	if (error) return NextResponse.json({ error }, { status: 400 });
	const deliveries = await prisma.delivery.findMany({
		where: {
			date: {
				gte: start,
				lt: end,
			},
			companyId: id,
		},
		include: {
			motoboy: true,
		},
	});
	return NextResponse.json(deliveries);
}
