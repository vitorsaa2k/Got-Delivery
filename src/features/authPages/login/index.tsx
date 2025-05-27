"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { removeTimeFromDate } from "@/utils/removeTimeDate";
import Link from "next/link";

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	return (
		<div className="p-4 rounded-2xl flex flex-col gap-2 border items-center">
			<label>
				Email
				<Input onChange={e => setEmail(e.currentTarget.value)} />
			</label>
			<label>
				Senha
				<Input onChange={e => setPassword(e.currentTarget.value)} />
			</label>
			<Button
				onClick={() => {
					signIn("credentials", {
						email,
						password,
						redirect: true,
						callbackUrl: `/delivery/date/${removeTimeFromDate(
							new Date().toISOString()
						)}T00:00:00.000Z`,
					});
				}}
			>
				Fazer Login
			</Button>
			<Link href="/register">Não tenho uma conta</Link>
		</div>
	);
}
