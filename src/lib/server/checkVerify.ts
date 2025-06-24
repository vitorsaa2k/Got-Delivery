import prisma from "@/lib/prisma";
import { Session } from "next-auth";

export async function checkIsAccountVerifiedSSR(session: Session) {
	const company = await prisma.company.findUnique({
		where: {
			email: session.user.email!,
		},
	});
	if (!company) {
		return { error: "Company not found", ok: false };
	}
	const verificationCode = await prisma.verificationCode.findUnique({
		where: {
			companyId: company.id,
		},
	});
	if (verificationCode?.verificationCode) {
		return { ok: false };
	}
	return { ok: true };
}
