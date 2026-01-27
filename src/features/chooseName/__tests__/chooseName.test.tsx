import { ChooseName } from "..";
import { renderWithProviders } from "@/tests/utils";
import { fireEvent, waitFor } from "@testing-library/react";
import { signOut, useSession } from "next-auth/react";
import { useRedirectToDashboard } from "@/hooks/useRedirectToDashboard";

// Mock dependencies
jest.mock("next-auth/react", () => ({
	useSession: jest.fn(),
	signOut: jest.fn(),
}));

jest.mock("../../../services/company", () => ({
	updateCompanyName: jest.fn(),
}));

jest.mock("../../../hooks/useRedirectToDashboard", () => ({
	useRedirectToDashboard: jest.fn(),
}));

jest.mock("next/navigation", () => ({
	useRouter: jest.fn(() => ({
		push: jest.fn(),
	})),
}));

// Import after mocks
import { updateCompanyName } from "../../../services/company";

const mockUseSession = useSession as jest.MockedFunction<typeof useSession>;
const mockSignOut = signOut as jest.MockedFunction<typeof signOut>;
const mockUpdateCompanyName = updateCompanyName as jest.MockedFunction<
	typeof updateCompanyName
>;
const mockRedirectToDashboard = useRedirectToDashboard as jest.MockedFunction<
	typeof useRedirectToDashboard
>;

describe("ChooseName", () => {
	const mockRedirect = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		mockUseSession.mockReturnValue({
			data: {
				user: {
					id: "123",
					email: "test@example.com",
					name: "Test User",
				},
				expires: new Date().toISOString(),
			},
			status: "authenticated" as const,
			update: jest.fn(),
		});
		mockRedirectToDashboard.mockReturnValue(mockRedirect);
		mockUpdateCompanyName.mockResolvedValue({ ok: true });
	});

	test("renders form with email display", () => {
		const result = renderWithProviders(<ChooseName />);

		expect(result.getByText("Escolha um nome")).toBeInTheDocument();
		expect(result.getByText(/Logado com o e-mail:/)).toBeInTheDocument();
	});

	test("renders input field", () => {
		const result = renderWithProviders(<ChooseName />);
		const input = result.container.querySelector("input");

		expect(input).toBeInTheDocument();
	});

	test("renders confirm and sign out buttons", () => {
		const result = renderWithProviders(<ChooseName />);

		expect(result.getByText("Confirmar")).toBeInTheDocument();
		expect(result.getByText("Sair")).toBeInTheDocument();
	});

	test("updates name state when input changes", () => {
		const result = renderWithProviders(<ChooseName />);
		const input = result.container.querySelector("input") as HTMLInputElement;

		fireEvent.change(input, { target: { value: "New Company Name" } });

		expect(input.value).toBe("New Company Name");
	});

	test("calls updateCompanyName and redirects on confirm button click", async () => {
		const result = renderWithProviders(<ChooseName />);
		const input = result.container.querySelector("input") as HTMLInputElement;
		const confirmButton = result.getByText("Confirmar");

		fireEvent.change(input, { target: { value: "New Company Name" } });
		fireEvent.click(confirmButton);

		await waitFor(() => {
			expect(mockUpdateCompanyName).toHaveBeenCalledWith(
				"123",
				"New Company Name"
			);
			expect(mockRedirect).toHaveBeenCalled();
		});
	});

	test("calls signOut when sign out button is clicked", () => {
		const result = renderWithProviders(<ChooseName />);
		const signOutButton = result.getByText("Sair");

		fireEvent.click(signOutButton);

		expect(mockSignOut).toHaveBeenCalled();
	});

	test("handles empty name input", async () => {
		const result = renderWithProviders(<ChooseName />);
		const confirmButton = result.getByText("Confirmar");

		fireEvent.click(confirmButton);

		await waitFor(() => {
			expect(mockUpdateCompanyName).toHaveBeenCalledWith("123", "");
		});
	});
});
