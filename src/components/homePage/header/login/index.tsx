import { LoginButton } from "./loginButton";
import { RegisterButton } from "./registerButton";

export function LoginButtons() {
	return (
		<div className="flex items-center justify-center">
			<LoginButton />
			<RegisterButton />
		</div>
	);
}
