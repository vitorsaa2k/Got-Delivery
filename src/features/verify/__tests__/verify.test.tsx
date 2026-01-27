import VerifyForm from "..";
import { renderWithProviders } from "@/tests/utils";
import { fireEvent, waitFor } from "@testing-library/react";
import { verifyAccountViaCode } from "@/services/verify";
//TODO add msw mock for email verification requests

// Mock dependencies
jest.mock("../../../../src/services/verify", () => ({
	verifyAccountViaCode: jest.fn(),
}));

jest.mock("next/navigation", () => ({
	useRouter: jest.fn(() => ({
		push: jest.fn(),
	})),
}));

const mockVerifyAccountViaCode = verifyAccountViaCode as jest.MockedFunction<
	typeof verifyAccountViaCode
>;

describe("VerifyForm", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		jest.useFakeTimers();
		mockVerifyAccountViaCode.mockResolvedValue({ ok: true });
	});

	afterEach(() => {
		jest.runOnlyPendingTimers();
		jest.useRealTimers();
	});

	test("renders verify form with header", () => {
		const result = renderWithProviders(<VerifyForm />);

		expect(
			result.getByText(
				/O e-mail de verificação incluindo um código foi enviado ao seu email/
			)
		).toBeInTheDocument();
	});

	test("renders code input field", () => {
		const result = renderWithProviders(<VerifyForm />);
		const codeInput = result.container.querySelector("input");

		expect(codeInput).toBeInTheDocument();
	});

	test("renders verify button", () => {
		const result = renderWithProviders(<VerifyForm />);

		expect(result.getByText("Verificar")).toBeInTheDocument();
	});

	test("renders RequestCodeButton component", () => {
		const result = renderWithProviders(<VerifyForm />);
		const container = result.getByText("Enviar código novamente");

		expect(container).toBeInTheDocument();
	});

	test("renders NoVerifyButton component", () => {
		const result = renderWithProviders(<VerifyForm />);
		const container = result.getByText("Continuar sem verificação");

		expect(container).toBeInTheDocument();
	});

	test("updates code state when input changes", () => {
		const result = renderWithProviders(<VerifyForm />);
		const codeInput = result.container.querySelector("input") as HTMLInputElement;

		fireEvent.change(codeInput, { target: { value: "123456" } });

		expect(codeInput.value).toBe("123456");
	});

	test("calls verifyAccountViaCode on verify button click", async () => {
		const result = renderWithProviders(<VerifyForm />);
		const codeInput = result.container.querySelector("input") as HTMLInputElement;
		const verifyButton = result.getByText("Verificar");

		fireEvent.change(codeInput, { target: { value: "123456" } });
		fireEvent.click(verifyButton);

		await waitFor(() => {
			expect(mockVerifyAccountViaCode).toHaveBeenCalledWith("123456");
		});
	});

	test("disables verify button while loading", async () => {
		mockVerifyAccountViaCode.mockImplementation(
			() =>
				new Promise(resolve =>
					setTimeout(() => resolve({ ok: true }), 100)
				)
		);

		const result = renderWithProviders(<VerifyForm />);
		const codeInput = result.container.querySelector("input") as HTMLInputElement;
		const verifyButton = result.getByText("Verificar") as HTMLButtonElement;

		fireEvent.change(codeInput, { target: { value: "123456" } });
		fireEvent.click(verifyButton);

		expect(verifyButton.disabled).toBe(true);
	});

	test("handles empty code input", async () => {
		const result = renderWithProviders(<VerifyForm />);
		const verifyButton = result.getByText("Verificar");

		fireEvent.click(verifyButton);

		await waitFor(() => {
			expect(mockVerifyAccountViaCode).toHaveBeenCalledWith("");
		});
	});
});
