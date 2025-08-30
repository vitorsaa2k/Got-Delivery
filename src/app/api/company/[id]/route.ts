import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params;
	const body: { name: string } = await req.json();
	const company = await prisma.company.update({
		where: { id },
		data: {
			name: body.name,
		},
	});
	return NextResponse.json({ ok: true, data: company }, { status: 200 });
}
