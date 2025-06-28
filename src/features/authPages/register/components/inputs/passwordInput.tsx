import { Input } from "@/components/ui/input";
import { InputError } from "@/components/ui/inputError";
import { LockIcon } from "@phosphor-icons/react";
import { Dispatch, SetStateAction } from "react";

export function RegisterPasswordInput({
	setPassword,
	inputError,
}: {
	setPassword: Dispatch<SetStateAction<string>>;
	inputError?: string[] | null;
}) {
	return (
		<label className="w-full flex flex-col items-center">
			<p className="self-start">Senha</p>
			<div className="relative w-full">
				<LockIcon
					weight="light"
					size={24}
					className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
				/>
				<Input
					className={`pl-11 h-12 ${
						inputError &&
						"focus-visible:border-red-500 focus-visible:ring-red-500 border-red-500"
					}`}
					placeholder="Mínimo de 8 caracteres"
					type="password"
					onChange={e => setPassword(e.currentTarget.value)}
				/>
			</div>
			<InputError inputError={inputError} />
		</label>
	);
}
