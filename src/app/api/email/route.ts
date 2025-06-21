import { sendVerificationEmail } from "@/lib/nodemailer";
import prisma from "@/lib/prisma";
import { generateRandomCode } from "@/utils/generateRandomCode";
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
	const verificationCode = await prisma.verificationCode.findUnique({
		where: {
			companyId: company.id,
		},
	});

	if (verificationCode?.verificationCode) {
		return NextResponse.json(
			{ error: "E-mail not verified", ok: false },
			{ status: 400 }
		);
	}
	return NextResponse.json(
		{
			message: "E-mail is verified",
			ok: true,
		},
		{ status: 200 }
	);
}
export async function POST(req: NextRequest) {
	const body: { id: string; email: string } = await req.json();
	if (!body.id) {
		return NextResponse.json(
			{ error: "Account id not provided" },
			{ status: 400 }
		);
	}

	const verificationCode = await prisma.verificationCode.update({
		where: {
			id: body.id,
		},
		data: {
			verificationCode: generateRandomCode().toString(),
		},
	});
	await sendVerificationEmail({
		code: `${verificationCode.verificationCode}`,
		token: body.id,
		userEmail: body.email,
	});
	return NextResponse.json({ message: "E-mail sent" }, { status: 200 });
}
