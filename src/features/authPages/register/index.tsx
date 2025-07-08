"use client";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { CompanyRegister } from "@/lib/zod/company";
import { RegisterResponse } from "@/types/global/types";
import { getCurrentDateDefaultTime } from "@/utils/manageDate";
import { signIn, SignInResponse } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { RegisterEmailInput } from "./components/inputs/emailInput";
import { RegisterPasswordInput } from "./components/inputs/passwordInput";
import { RegisterNameInput } from "./components/inputs/nameInput";
import * as z from "zod/v4";

export default function RegisterForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [isSubmiting, setIsSubmiting] = useState(false);
	const [isComplete, setIsComplete] = useState(false);
	const [nameError, setNameError] = useState<string[] | null | undefined>();
	const [emailError, setEmailError] = useState<string[] | null | undefined>();
	const [passwordError, setPasswordError] = useState<
		string[] | null | undefined
	>();
	const redirectUrl = `/delivery/date/${getCurrentDateDefaultTime()}`;
	const router = useRouter();

	function handleSignIn(res: SignInResponse | undefined) {
		if (res) {
			if (res.error) {
				setIsSubmiting(false);
				return toast(`${res.error}`);
			}
			if (!res.error && res.ok) {
				setIsComplete(true);
				toast("Sendo redirecionado para dashboard...");
				return setTimeout(() => {
					router.push(res.url ?? redirectUrl);
				}, 1000);
			}
		}
	}

	function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		const parse = CompanyRegister.safeParse({ name, email, password });
		if (parse.error && !parse.success) {
			const fieldErrors = z.flattenError(parse.error).fieldErrors;
			setNameError(fieldErrors.name);
			setEmailError(fieldErrors.email);
			setPasswordError(fieldErrors.password);
			return;
		}

		setNameError(null);
		setEmailError(null);
		setPasswordError(null);
		setIsSubmiting(true);
		setIsComplete(false);
		const body = JSON.stringify({ name, password, email });
		fetch("/api/auth/register", { body, method: "POST" })
			.then(res => res.json())
			.then((data: RegisterResponse) => {
				setIsComplete(true);
				if (data.error) {
					setEmailError(data.error.email);
					setNameError(data.error.name);
					setPasswordError(data.error.password);
					setIsSubmiting(false);
					return;
				}
				signIn("credentials", {
					email,
					password,
					redirect: false,
					callbackUrl: redirectUrl,
				}).then(handleSignIn);
			});
	}

	return (
		<form className="py-6 px-8 rounded-2xl flex flex-col gap-2 border items-center">
			<p className="text-3xl font-bold text-center">
				Crie uma conta em segundos!
			</p>
			<RegisterNameInput inputError={nameError} setName={setName} />
			<RegisterEmailInput inputError={emailError} setEmail={setEmail} />
			<RegisterPasswordInput
				inputError={passwordError}
				setPassword={setPassword}
			/>
			<Link className="underline" href={"/login"}>
				Já tenho uma conta
			</Link>
			<Button
				disabled={isSubmiting}
				className="hover:cursor-pointer py-6 w-full"
				onClick={handleSubmit}
			>
				{isSubmiting ? (
					<Spinner isComplete={isComplete} isLoading={isSubmiting} />
				) : (
					"Registrar"
				)}
			</Button>
		</form>
	);
}
