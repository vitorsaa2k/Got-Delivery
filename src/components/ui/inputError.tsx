import * as React from "react";

import { cn } from "@/lib/utils";

interface InputErrorProps extends React.ComponentProps<"p"> {
	inputError?: string[] | null;
}

function InputError({ inputError, className, ...props }: InputErrorProps) {
	return (
		inputError && (
			<p
				data-slot="input-error"
				className={cn("self-start text-red-500 text-[12px]", className)}
				{...props}
			>
				{inputError}
			</p>
		)
	);
}

export { InputError };
