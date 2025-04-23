import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
	const deliveries = await prisma.motoboy.findMany();
	return NextResponse.json(deliveries);
}

export async function POST(request: NextRequest) {
	const body = await request.json();
	const motoboy = await prisma.motoboy.create({
		data: body,
	});

	return NextResponse.json(motoboy, { status: 200 });
}
