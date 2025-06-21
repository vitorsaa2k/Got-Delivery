import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ token: string }> }
) {
	const { token } = await params;
	const verificationCode = await prisma.verificationCode.update({
		where: {
			id: token,
		},
		data: {
			verificationCode: null,
		},
	});
	return NextResponse.json(
		{ message: "E-mail verified", verificationCode },
		{ status: 200 }
	);
}

export async function POST(req: NextRequest) {
	const body = await req.json();
	if (!body.code) {
		return NextResponse.json({ error: "Code not provided" }, { status: 400 });
	}
	await prisma.verificationCode.update({
		where: {
			verificationCode: body.code,
		},
		data: {
			verificationCode: null,
		},
	});
	return NextResponse.json({ message: "E-mail verified" }, { status: 200 });
}
