"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ApiResponse } from "@/types/global/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function RegisterForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const router = useRouter();
	return (
		<div className="p-4 rounded-2xl flex flex-col gap-2 border items-center">
			<label>
				Nome
				<Input onChange={e => setName(e.currentTarget.value)} />
			</label>
			<label>
				Email
				<Input onChange={e => setEmail(e.currentTarget.value)} />
			</label>
			<label>
				Senha
				<Input
					type="password"
					onChange={e => setPassword(e.currentTarget.value)}
				/>
			</label>
			<Button
				onClick={() => {
					const body = JSON.stringify({ name, password, email });
					fetch("/api/auth/register", { body, method: "POST" })
						.then(res => res.json())
						.then((data: ApiResponse) => {
							if (data.error) return toast(data.error);
							router.push("/");
						});
				}}
			>
				Registrar
			</Button>
		</div>
	);
}
