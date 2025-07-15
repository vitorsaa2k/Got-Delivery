export function Informations() {
	return (
		<div className="text-2xl max-lg:p-2">
			Informações como:
			<ul className=" lg:list-disc flex flex-col gap-1">
				<li>Total gasto com entregas.</li>
				<li>Total de entregas feitas no dia.</li>
				<li>Quanto deve ser pago pra cada motoboy naquele dia.</li>
			</ul>
		</div>
	);
}
