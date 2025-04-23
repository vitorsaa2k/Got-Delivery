import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
	const deliveries = await prisma.delivery.findMany();
	return NextResponse.json(deliveries);
}

export async function POST(request: NextRequest) {
	const body = await request.json();
	await prisma.delivery.create({
		data: body,
	});

	return NextResponse.json({ message: "Data received" }, { status: 200 });
}
