import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

function getDateRange(range: number) {
	const start = new Date();
	const end = new Date();
	end.setDate(end.getDate() - range);
	return { start, end };
}

export async function GET(req: NextRequest) {
	const { start, end } = getDateRange(7);
	const { searchParams } = new URL(req.url);
	const id = searchParams.get("id");
	if (!id)
		return NextResponse.json({
			error: "companyId was not provided",
		});
	console.log(start, end);
	const deliveriesDateResume = await prisma.delivery.groupBy({
		by: ["date"],
		where: {
			companyId: id,
			date: {
				gte: end,
				lt: start,
			},
		},
		_count: {
			date: true,
		},
		orderBy: {
			date: "desc",
		},
	});
	const deliveriesSourceResume = await prisma.delivery.groupBy({
		by: ["source"],
		where: {
			companyId: id,
			date: {
				gte: end,
				lt: start,
			},
		},
		_count: {
			source: true,
		},
		orderBy: {
			source: "asc",
		},
	});
	const deliveriesLastWeekPromise = prisma.delivery.findMany({
		where: {
			companyId: id,
			date: {
				gte: end,
				lt: start,
			},
		},
		include: {
			motoboy: true,
		},
	});
	const monthRange = getDateRange(30);
	const deliveriesLastMonthPromise = prisma.delivery.findMany({
		where: {
			companyId: id,
			date: {
				gte: monthRange.end,
				lt: monthRange.start,
			},
		},
		include: {
			motoboy: true,
		},
	});
	const [deliveriesLastWeek, deliveriesLastMonth] = await Promise.all([
		deliveriesLastWeekPromise,
		deliveriesLastMonthPromise,
	]);
	return NextResponse.json({
		deliveriesLastWeek,
		deliveriesLastMonth,
	});
}
