import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest,
	params: Promise<{ params: { date: Date } }>
) {
	console.log(await params);
	const { date } = (await params).params;
	/* let error;
	const deliveries = await prisma.delivery
		.findMany({
			where: {
				date: {
					gte: date,
					lt: date,
				},
			},
			include: {
				motoboy: true,
			},
		})
		.catch(err => (error = err));
	console.log(deliveries); */
	return NextResponse.json({ res: date });
}
