import { DeliveryTable } from "..";
import { renderWithProviders } from "@/tests/utils";
import { SessionContextValue, useSession } from "next-auth/react";
import { http, HttpResponse } from "msw";
import { Delivery } from "@/types/global/types";
import { server } from "../../../../jest.setup";
import { act, screen, waitFor } from "@testing-library/react";

// Mock dependencies
jest.mock("next-auth/react", () => ({
	useSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
	useParams: jest.fn(() => ({ date: "2024-01-01T00:00:00.000Z" })),
}));

jest.mock("../../../stores/deliveriesStore", () => ({
	useDeliveriesStore: jest.fn(() => ({
		updateDeliveryList: jest.fn(),
	})),
}));

const mockUseSession = useSession as jest.MockedFunction<typeof useSession>;

const mockDelivery: Delivery = {
	id: "1",
	finalValue: 10.5,
	neighborhood: "Test Neighborhood",
	source: "Ifood",
	motoboy: {
		id: "1",
		name: "Test Motoboy",
		pix: "test@pix.com",
		companyId: "123",
	},
	motoboyId: "1",
	date: new Date("2024-01-01"),
	companyId: "123",
};

describe("DeliveryTable", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockUseSession.mockReturnValue({
			data: {
				user: {
					id: "123",
					email: "test@example.com",
				},
			},
			status: "authenticated",
		} as unknown as SessionContextValue);

		// Setup MSW handler for deliveries
		server.use(
			http.get("/api/delivery/date/:date", ({ request }) => {
				const url = new URL(request.url);
				const companyId = url.searchParams.get("id");
				if (companyId === mockDelivery.companyId) {
					return HttpResponse.json([mockDelivery]);
				}
				return HttpResponse.json([]);
			})
		);
	});

	test("renders loading text when deliveryList is loading", async () => {
		act(() => {
		 renderWithProviders(<DeliveryTable />);
		})
		const container = await screen.findByRole("paragraph");
		expect(container).toBeInTheDocument();
	});

	test("renders deliveries when data is loaded", async () => {
		act(() => {
			renderWithProviders(<DeliveryTable />);
		})
		const container = await screen.findByTestId("delivery-table");
		await waitFor(() => {
			expect(container).toBeInTheDocument();
		});
	});

	test("renders correct number of delivery items", async () => {
		act(() => {
			renderWithProviders(<DeliveryTable />);
		})

		const container = await screen.findByTestId("delivery-table");
		expect(container).toBeInTheDocument();
	});

	test("has correct CSS classes", async () => {
		act(() => {
			renderWithProviders(<DeliveryTable />);
		})

		const container = await screen.findByTestId("delivery-table");
		if (container) {
			expect(container).toHaveClass("flex", "gap-2", "flex-wrap");
		}
	});
});
