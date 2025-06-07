import prisma from "@/lib/prisma";
import { Delivery } from "@/types/global/types";
import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const id = searchParams.get("id");
	if (!id)
		return NextResponse.json({
			error: "companyId was not provided",
		});
	const deliveries = await prisma.delivery.findMany({
		where: { companyId: id },
		include: {
			motoboy: true,
		},
	});
	return NextResponse.json(deliveries);
}

export async function POST(request: NextRequest) {
	const body: Delivery = await request.json();
	const mockId = randomBytes(12).toString("hex");
	const delivery = await prisma.delivery.upsert({
		where: {
			id: body.id ?? mockId,
		},
		create: {
			date: body.date,
			finalValue: body.finalValue,
			neighborhood: body.neighborhood,
			source: body.source,
			motoboyId: body.motoboyId,
			companyId: body.companyId,
		},
		update: {
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
