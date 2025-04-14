import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMotoboyStore } from "@/stores/motoboyStore";
import { useState } from "react";

export function AddMotoboyForm() {
	const [name, setName] = useState<string>("");
	const [pix, setPix] = useState<string>("");
	const addMotoboy = useMotoboyStore(state => state.addMotoboy);

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
			<Button
				className="hover:cursor-pointer"
				onClick={() => addMotoboy({ pix, name })}
			>
				Adicionar Motoboy
			</Button>
		</>
	);
}
