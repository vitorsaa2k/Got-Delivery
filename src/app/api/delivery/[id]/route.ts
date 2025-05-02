import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params;
	const delivery = await prisma.delivery.findUnique({
		where: { id },
		include: {
			motoboy: true,
		},
	});

	return NextResponse.json({ ...delivery }, { status: 200 });
}
