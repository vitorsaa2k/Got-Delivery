"use client";
import { Delivery } from "@/types/global/types";
import {
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	BarChart,
	Bar,
	Rectangle,
} from "recharts";

const data = [
	{ day: "Ifood", deliveries: 35 },
	{ day: "PedeAi", deliveries: 23 },
	{ day: "Whatsapp", deliveries: 17 },
];

export function LastWeekDeliveriesChart({
	lastWeekDeliveries,
}: {
	lastWeekDeliveries: Delivery[];
}) {
	const formatedData = lastWeekDeliveries.map(delivery => ({
		...delivery,
		date: new Date(delivery.date).getDate(),
	}));
	console.log(formatedData);
	return (
		<ResponsiveContainer width="100%" height="100%" aspect={500 / 300}>
			<BarChart
				width={500}
				height={300}
				data={data}
				margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 5,
				}}
			>
				<XAxis dataKey="day" />
				<YAxis />
				<Tooltip />
				<Bar
					dataKey="deliveries"
					fill="#8884d8"
					activeBar={<Rectangle fill="pink" stroke="blue" />}
				/>
			</BarChart>
		</ResponsiveContainer>
	);
}
