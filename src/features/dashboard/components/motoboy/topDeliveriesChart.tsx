import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from "recharts";

const data = [
	{ name: "Jan", uv: 400 },
	{ name: "Feb", uv: 300 },
	{ name: "Mar", uv: 500 },
];

export function MostDeliveriesChart() {
	return (
		<LineChart width={500} height={300} data={data}>
			<CartesianGrid stroke="#eee" strokeDasharray="5 5" />
			<XAxis dataKey="name" />
			<YAxis />
			<Tooltip />
			<Legend />
			<Line type="linear" dataKey="uv" stroke="#8884d8" />
		</LineChart>
	);
}
