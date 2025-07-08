export function MotoboyItem({ name, value }: { name: string; value: number }) {
	const formatedValue = new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(value);
	return (
		<div className="flex items-center justify-between">
			<p>{name}</p>
			<hr className="w-full mx-2" />
			<p className="whitespace-nowrap">{formatedValue}</p>
		</div>
	);
}
