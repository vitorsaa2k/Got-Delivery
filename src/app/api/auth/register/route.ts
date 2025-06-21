import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { generateRandomCode } from "@/utils/generateRandomCode";
import { sendVerificationEmail } from "@/lib/nodemailer";

export async function POST(req: Request) {
	const { email, password, name } = await req.json();

	if (!email || !password) {
		return NextResponse.json(
			{ error: "Email e senha são obrigatórios" },
			{ status: 400 }
		);
	}

	if (!name) {
		return NextResponse.json({ error: "Escolha um nome" }, { status: 400 });
	}

	const existingCompany = await prisma.company.findUnique({
		where: { email },
	});

	if (existingCompany) {
		return NextResponse.json(
			{ error: "Este email já está sendo usado" },
			{ status: 400 }
		);
	}

	const hashedPassword = await hash(password, 10);

	const company = await prisma.company.create({
		data: {
			name,
			email,
			password: hashedPassword,
		},
	});
	const verificationCode = await prisma.verificationCode.create({
		data: {
			companyId: company.id,
			verificationCode: generateRandomCode().toString(),
		},
	});
	if (verificationCode.verificationCode) {
		await sendVerificationEmail({
			code: verificationCode.verificationCode,
			userEmail: company.email,
			token: verificationCode.id,
		});
	}
	return NextResponse.json({
		message: "Company created",
		company,
		verificationCode,
	});
}
