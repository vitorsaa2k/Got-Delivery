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
	const body = await req.json() as {code: string};
	if (!body.code) {
		return NextResponse.json({ error: "Code not provided" }, { status: 400 });
	}
	const verificationCode = await prisma.verificationCode.updateMany({
		where: {
			verificationCode: body.code,
		},
		data: {
			verificationCode: null,
		},
	});
	if(verificationCode.count === 0) {
		return NextResponse.json({ error: "Wrong code provided", }, { status: 400 });
	}
	return NextResponse.json({ message: "E-mail verified" }, { status: 200 });
}
