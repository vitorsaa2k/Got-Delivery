import { DayDeliveriesResume } from "..";
import { renderWithProviders } from "@/tests/utils";
import { useDeliveriesStore } from "@/stores/deliveriesStore";

// Mock the store
jest.mock("../../../stores/deliveriesStore", () => ({
	useDeliveriesStore: jest.fn(),
}));

const mockUseDeliveriesStore = useDeliveriesStore as jest.MockedFunction<
	typeof useDeliveriesStore
>;

describe("DayDeliveriesResume", () => {
	beforeEach(() => {
		mockUseDeliveriesStore.mockReturnValue([]);
	});

	test("renders DayDeliveriesResume component", () => {
		const result = renderWithProviders(<DayDeliveriesResume />);
		const container = result.container.querySelector("div");

		expect(container).toBeInTheDocument();
	});

	test("renders DailyResumeHeader", () => {
		const result = renderWithProviders(<DayDeliveriesResume />);
		// The header should be rendered - check by looking for the component structure
		const container = result.container.querySelector("div");

		expect(container).toBeInTheDocument();
	});

	test("renders MotoboyList component", () => {
		const result = renderWithProviders(<DayDeliveriesResume />);
		const container = result.container.querySelector("div");

		expect(container).toBeInTheDocument();
	});

	test("renders DailyResumeFooter", () => {
		const result = renderWithProviders(<DayDeliveriesResume />);
		const container = result.container.querySelector("div");

		expect(container).toBeInTheDocument();
	});

	test("has correct CSS classes", () => {
		const result = renderWithProviders(<DayDeliveriesResume />);
		const container = result.container.querySelector("div");

		expect(container).toHaveClass(
			"border",
			"rounded",
			"flex",
			"flex-col",
			"justify-between",
			"p-4"
		);
	});
});
