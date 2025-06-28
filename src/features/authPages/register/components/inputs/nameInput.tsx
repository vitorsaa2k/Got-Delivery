import { Input } from "@/components/ui/input";
import { InputError } from "@/components/ui/inputError";
import { BuildingsIcon } from "@phosphor-icons/react";
import { Dispatch, SetStateAction } from "react";

export function RegisterNameInput({
	setName,
	inputError,
}: {
	setName: Dispatch<SetStateAction<string>>;
	inputError?: string[] | null;
}) {
	return (
		<label className="w-full flex flex-col items-center">
			<p className="self-start">Nome da empresa</p>
			<div className="relative w-full">
				<BuildingsIcon
					weight="light"
					size={24}
					className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
				/>
				<Input
					className={`pl-11 h-12 ${
						inputError &&
						"focus-visible:border-red-500 focus-visible:ring-red-500 border-red-500"
					}`}
					placeholder="Google"
					onChange={e => setName(e.currentTarget.value)}
				/>
			</div>
			<InputError inputError={inputError} />
		</label>
	);
}
