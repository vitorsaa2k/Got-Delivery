import { DashboardHome } from "..";
import { renderWithProviders } from "@/tests/utils";

describe("DashboardHome", () => {
	test("renders dashboard component", () => {
		const result = renderWithProviders(<DashboardHome />);
		const main = result.container.querySelector("main");

		expect(main).toBeInTheDocument();
	});

	test("has correct CSS classes", () => {
		const result = renderWithProviders(<DashboardHome />);
		const main = result.container.querySelector("main");

		expect(main).toHaveClass("flex", "justify-between", "p-9");
	});
});
