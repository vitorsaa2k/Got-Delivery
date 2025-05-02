import prisma from "@/lib/prisma";
import { Delivery } from "@/types/global/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
	const deliveries = await prisma.delivery.findMany({
		include: {
			motoboy: true,
		},
	});
	console.log(deliveries);
	return NextResponse.json(deliveries);
}

export async function POST(request: NextRequest) {
	const body: Delivery = await request.json();
	console.log(body);
	const delivery = await prisma.delivery.create({
		data: {
			date: body.date,
			finalValue: body.finalValue,
			neighborhood: body.neighborhood,
			source: body.source,
			motoboyId: body.motoboyId,
		},
	});

	return NextResponse.json(
		{ ...delivery, motoboy: body.motoboy },
		{ status: 200 }
	);
}
