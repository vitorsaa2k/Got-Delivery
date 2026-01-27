import { signIn } from "next-auth/react";
import { GoogleLogo } from "../../components/googleLogo";
import { getCurrentDateDefaultTime } from "@/utils/manageDate";

export function GoogleLogin() {
	const redirectDate = getCurrentDateDefaultTime();
	async function login(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		await signIn("google", {
			redirect: false,
			callbackUrl: `/delivery/date/${redirectDate}`,
		});
	}
	return (
		<>
			<button
				onClick={login}
				className="hover:cursor-pointer bg-white shadow p-2 rounded flex gap-2 font-semibold text-primary"
			>
				<GoogleLogo /> Google
			</button>
		</>
	);
}
