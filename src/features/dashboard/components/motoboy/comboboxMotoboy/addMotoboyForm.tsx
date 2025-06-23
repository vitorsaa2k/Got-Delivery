import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { postMotoboy } from "@/services/motoboy";
import { useMotoboyStore } from "@/stores/motoboyStore";
import { Motoboy } from "@/types/global/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

export function AddMotoboyForm({
	setIsDialogOpen,
}: {
	setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
}) {
	const [name, setName] = useState<string>("");
	const [pix, setPix] = useState<string>("");
	const [isSubmiting, setIsSubmiting] = useState(false);
	const [isComplete, setIsComplete] = useState(false);
	const addMotoboy = useMotoboyStore(state => state.addMotoboy);
	const session = useSession();
	const queryClient = useQueryClient();
	const createMotoboy = useMutation({
		mutationFn: async ({ name, pix }: { name: string; pix: string }) => {
			setIsSubmiting(true);
			return await postMotoboy({
				name,
				pix,
				companyId: session.data!.user.id,
			});
		},
		onSuccess: (data: Motoboy) => {
			setIsComplete(true);
			addMotoboy(data);
			setIsDialogOpen(false);
			queryClient.invalidateQueries({ queryKey: ["motoboyList"] });
		},
		onError: () => {
			toast("Ocorreu um erro em: Adicionar Motoboy");
			setIsSubmiting(false);
		},
	});
	function handleAddMotoboy() {
		createMotoboy.mutate({ name, pix });
	}

	return (
		<div className="flex flex-col gap-2">
			<label>
				Nome
				<Input
					onChange={e => setName(e.target.value)}
					type="text"
					placeholder="Nome do motoboy"
				/>
			</label>
			<label>
				Pix
				<Input
					onChange={e => setPix(e.target.value)}
					type="text"
					placeholder="Chave Pix"
				/>
			</label>
			<Button
				disabled={isSubmiting}
				className="hover:cursor-pointer"
				onClick={handleAddMotoboy}
			>
				{isSubmiting ? (
					<Spinner isLoading={isSubmiting} isComplete={isComplete} />
				) : (
					"Adicionar Motoboy"
				)}
			</Button>
		</div>
	);
}
