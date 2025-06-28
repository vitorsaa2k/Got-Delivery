import * as z from "zod/v4";

export const CompanyRegister = z.strictObject({
	name: z.string().min(1, "Escolha um nome"),
	email: z.email("E-mail inválido"),
	password: z.string().min(8, "A senha deve conter no mínimo 8 caracteres"),
});

export const CompanyLogin = z.object({
	email: z.email("E-mail inválido"),
	password: z.string(),
});
