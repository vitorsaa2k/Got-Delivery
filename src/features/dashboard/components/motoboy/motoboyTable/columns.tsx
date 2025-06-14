"use client";

import { Motoboy } from "@/types/global/types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteMotoboy } from "@/services/motoboy";
import { toast } from "sonner";

export const columns: ColumnDef<Motoboy>[] = [
	{
		accessorKey: "name",
		header: "Nome",
	},
	{
		accessorKey: "pix",
		header: "Pix",
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const motoboy = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Abrir Menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Ações</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem asChild>
							<Link href={`/motoboy/${motoboy.id}`}>Editar</Link>
						</DropdownMenuItem>
						<DropdownMenuItem
							asChild
							className="text-red-400 focus:text-red-400"
						>
							<AlertDialog>
								<AlertDialogTrigger className="focus:bg-accent hover:bg-accent w-full text-red-400 focus:text-red-400 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
									Delete
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>Tem certeza?</AlertDialogTitle>
										<AlertDialogDescription>
											Quer deletar esse motoboy permanentemente? (TODOS OS
											DELIVERYS FEITOS POR ESSE MOTOBOY SERÃO DELETADOS)
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>Cancelar</AlertDialogCancel>
										<AlertDialogAction
											onClick={() => {
												deleteMotoboy(motoboy.id).then(() =>
													toast("Motoboy deletado com sucesso")
												);
											}}
										>
											Continuar
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
