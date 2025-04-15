"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { AddMotoboyForm } from "./addMotoboyForm";
import { useEffect, useState } from "react";
import { useMotoboyStore } from "@/stores/motoboyStore";

export function AddMotoboyDialog() {
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
	const motoboyList = useMotoboyStore(state => state.motoboyList);

	useEffect(() => {
		setIsDialogOpen(state => !state);
	}, [motoboyList]);

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<Button
					onClick={() => setIsDialogOpen(state => !state)}
					className="hover:cursor-pointer"
				>
					Adicionar Motoboy
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Adicionar Motoboy</DialogTitle>
					<DialogDescription>
						<AddMotoboyForm />
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
