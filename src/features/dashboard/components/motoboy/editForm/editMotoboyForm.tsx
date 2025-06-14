"use client";
import { BackButton } from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchMotoboyById, updateMotoboy } from "@/services/motoboy";
import { useMotoboyStore } from "@/stores/motoboyStore";
import { Motoboy } from "@/types/global/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function EditMotoboyForm() {
	const params = useParams();
	const { data: motoboy } = useQuery({
		queryKey: ["motoboy", `${params.id}`],
		queryFn: () => fetchMotoboyById(`${params.id}`),
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
	const [name, setName] = useState<string>("");
	const [pix, setPix] = useState<string>("");
	const updateMotoboyInStore = useMotoboyStore(state => state.updateMotoboy);
	const queryClient = useQueryClient();
	const updateMotoboyMutation = useMutation({
		mutationFn: async (motoboy: Motoboy) => {
			return await updateMotoboy(motoboy);
		},
		onSuccess: (data: Motoboy) => {
			toast("Motoboy editado com successo");
			updateMotoboyInStore(data, data);
			queryClient.invalidateQueries({ queryKey: ["motoboy", `${params.id}`] });
			queryClient.invalidateQueries({ queryKey: ["motoboyList"] });
		},
		onError: () => {
			toast("Ocorreu um erro em: Atualizar Motoboy");
		},
	});
	function handleUpdateMotoboy() {
		if (!motoboy) return toast("Erro em Atualizar Motoboy: Motoboy não existe");
		updateMotoboyMutation.mutate({ ...motoboy, name, pix });
	}

	useEffect(() => {
		if (motoboy) {
			setName(motoboy.name);
			setPix(motoboy.pix);
		}
	}, [motoboy]);

	return (
		<main className="p-2">
			<div className="flex flex-col">
				<BackButton />
				<label>Nome</label>
				<Input
					value={name}
					onChange={e => setName(e.target.value)}
					type="text"
					placeholder="Nome do motoboy"
				/>
				<label>Pix</label>
				<Input
					value={pix}
					onChange={e => setPix(e.target.value)}
					type="text"
					placeholder="Chave Pix"
				/>
				<Button
					disabled={updateMotoboyMutation.isPending}
					className="hover:cursor-pointer"
					onClick={handleUpdateMotoboy}
				>
					Editar Motoboy
				</Button>
			</div>
		</main>
	);
}
