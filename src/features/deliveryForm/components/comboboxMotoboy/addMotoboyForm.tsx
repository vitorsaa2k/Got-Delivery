import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { postMotoboy } from "@/services/motoboy";
import { useMotoboyStore } from "@/stores/motoboyStore";
import { Motoboy } from "@/types/global/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

export function AddMotoboyForm() {
	const [name, setName] = useState<string>("");
	const [pix, setPix] = useState<string>("");
	const addMotoboy = useMotoboyStore(state => state.addMotoboy);
	const session = useSession();
	const queryClient = useQueryClient();
	console.log(session);
	const createMotoboy = useMutation({
		mutationFn: async ({ name, pix }: { name: string; pix: string }) => {
			return await postMotoboy({
				name,
				pix,
				companyId: session.data!.user.id,
			});
		},
		onSuccess: (data: Motoboy) => {
			addMotoboy(data);
			queryClient.invalidateQueries({ queryKey: ["motoboyList"] });
		},
		onError: () => {
			toast("Ocorreu um erro em: Adicionar Motoboy");
		},
	});
	function handleAddMotoboy() {
		createMotoboy.mutate({ name, pix });
	}

	return (
		<>
			<label>Nome</label>
			<Input
				onChange={e => setName(e.target.value)}
				type="text"
				placeholder="Nome do motoboy"
			/>
			<label>Pix</label>
			<Input
				onChange={e => setPix(e.target.value)}
				type="text"
				placeholder="Chave Pix"
			/>
			<Button className="hover:cursor-pointer" onClick={handleAddMotoboy}>
				Adicionar Motoboy
			</Button>
		</>
	);
}
