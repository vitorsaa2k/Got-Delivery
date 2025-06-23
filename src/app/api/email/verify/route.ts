import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const email = searchParams.get("email");
	if (!email) {
		return NextResponse.json({ error: "Email not provided" }, { status: 400 });
	}
	const company = await prisma.company.findUnique({
		where: {
			email,
		},
	});
	if (!company) {
		return NextResponse.json({ error: "Company not found" }, { status: 400 });
	}
	await prisma.verificationCode.update({
		where: {
			companyId: company.id,
		},
		data: {
			verificationCode: null,
		},
	});

	return NextResponse.json(
		{
			message: "Account is verified",
		},
		{ status: 200 }
	);
}
