import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: process.env.EMAIL_NODEMAILER,
		pass: process.env.APP_PASSWORD,
	},
});

export async function sendVerificationEmail({
	code,
	userEmail,
	token,
}: {
	userEmail: string;
	code: string;
	token: string;
}) {
	return await transporter.sendMail({
		from: `GotDelivery <gotdeliverysup@gmail.com>`,
		to: userEmail,
		subject: "Verificação de e-mail",
		html: `<h1>Verificação de email</h1>
				<p>Caso esta ação não tenha sido realizada por você, apenas ignore este e-mail</p>
        <p>Código: <code>${code}</code></p>
        <p>Link para verificação: <a target="_blank" href="${
					process.env.NODE_ENV === "production"
						? process.env.PROD_URL
						: "http://localhost:3000"
				}/verify/${token}">Clique Aqui</a></p>`,
	});
}
