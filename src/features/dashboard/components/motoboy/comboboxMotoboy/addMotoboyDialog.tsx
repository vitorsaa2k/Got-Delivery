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
import { useState } from "react";

export function AddMotoboyDialog() {
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

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
					<DialogDescription />
				</DialogHeader>
				<AddMotoboyForm setIsDialogOpen={setIsDialogOpen} />
			</DialogContent>
		</Dialog>
	);
}
