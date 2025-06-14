import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const id = searchParams.get("id");
	if (!id) {
		return NextResponse.json(
			{ error: "CompanyId not Provided" },
			{ status: 400 }
		);
	}
	const deliveries = await prisma.motoboy.findMany({
		where: {
			companyId: id,
		},
	});
	return NextResponse.json(deliveries);
}

export async function POST(request: NextRequest) {
	const body = await request.json();
	const motoboy = await prisma.motoboy.create({
		data: body,
	});

	return NextResponse.json(motoboy, { status: 200 });
}

export async function DELETE(request: NextRequest) {
	const body = await request.json();
	console.log(body);
	const motoboy = await prisma.motoboy.delete({
		where: {
			id: body.id,
		},
	});
	console.log(motoboy);

	return NextResponse.json({ message: "motoboy deletado" }, { status: 200 });
}
