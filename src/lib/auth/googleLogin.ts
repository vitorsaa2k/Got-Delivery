import { User } from "next-auth";
import prisma from "../prisma";
import { hash } from "bcrypt";

export async function handleGoogleLogin(user: User) {
	const company = await prisma.company.findUnique({ where: { id: user.id } });
	const password = await hash(crypto.randomUUID(), 10);
	if (!company) {
		await prisma.company.create({
			data: {
				name: `${user.name}`,
				email: `${user.email}`,
				password: password,
				id: user.id,
			},
		});
		await prisma.verificationCode.create({
			data: {
				companyId: user.id,
				verificationCode: null,
			},
		});
	}
	return true;
}
