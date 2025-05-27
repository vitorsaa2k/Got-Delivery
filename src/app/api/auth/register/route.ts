import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from "bcrypt";

export async function POST(req: Request) {
	const { email, password, name } = await req.json();
	console.log(email, password, name);

	if (!email || !password) {
		return NextResponse.json(
			{ error: "Email and password are required" },
			{ status: 400 }
		);
	}

	const existingCompany = await prisma.company.findUnique({
		where: { email },
	});

	if (existingCompany) {
		return NextResponse.json(
			{ error: "This email is already being used" },
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
	return NextResponse.json({
		message: "Company created",
		company,
	});
}
