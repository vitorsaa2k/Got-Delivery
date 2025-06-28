import * as z from "zod/v4";

export const CompanyRegister = z.object({
	name: z.string(),
	email: z.email("E-mail inválido"),
	password: z.string().min(8, "A senha deve conter no mínimo 8 caractéres"),
});

export const CompanyLogin = z.object({
	email: z.email("E-mail inválido"),
	password: z.string(),
});
