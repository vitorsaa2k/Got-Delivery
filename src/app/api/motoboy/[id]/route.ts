import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params;
	const motoboy = await prisma.motoboy.findUnique({
		where: { id },
	});

	return NextResponse.json(motoboy, { status: 200 });
}

export async function POST(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const body = await req.json();
	const { id } = await params;
	const motoboy = await prisma.motoboy.update({
		where: { id },
		data: body,
	});

	return NextResponse.json(motoboy, { status: 200 });
}
