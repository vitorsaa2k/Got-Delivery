"use client";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { makeAccountVerified } from "@/services/verify";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { getCurrentDateDefaultTime } from "@/utils/manageDate";

export function NoVerifyButton() {
	const session = useSession();
	const router = useRouter();
	const [isComplete, setIsComplete] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	async function continueWithoutVerify() {
		setIsLoading(true);
		const account = session.data!.user;
		await makeAccountVerified(account.email!);
		toast("Redirecionando para dashboard...");
		setIsComplete(true);
		setTimeout(() => {
			router.push(`${getCurrentDateDefaultTime()}`);
		}, 1000);
		return;
	}
	return (
		<Dialog>
			<form>
				<DialogTrigger asChild>
					<Button className="bg-red-400 hover:bg-red-600 hover:cursor-pointer">
						Continuar sem verificação
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Continuar sem verificação?</DialogTitle>
						<DialogDescription>
							Você não poderá recuperar a senha de sua conta caso escolha
							prosseguir.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button
							className="hover:cursor-pointer bg-red-400 hover:bg-red-600"
							disabled={isLoading}
							onClick={continueWithoutVerify}
						>
							{isLoading ? (
								<Spinner isLoading isComplete={isComplete} />
							) : (
								"Continuar sem verificação"
							)}
						</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	);
}
