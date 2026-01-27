import LoginForm from "..";
import { renderWithProviders } from "@/tests/utils";
import { fireEvent, waitFor } from "@testing-library/react";
import { signIn, SignInResponse } from "next-auth/react";

// Mock dependencies
jest.mock("next-auth/react", () => ({
	useSession: jest.fn(() => ({
		data: null,
		status: "unauthenticated",
	})),
	signIn: jest.fn(),
}));

jest.mock("next/navigation", () => ({
	useRouter: jest.fn(() => ({
		push: jest.fn(),
	})),
}));

const mockSignIn = signIn as jest.MockedFunction<typeof signIn>;

describe("LoginForm", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.runOnlyPendingTimers();
		jest.useRealTimers();
	});

	test("renders login form with all fields", () => {
		const result = renderWithProviders(<LoginForm />);

		expect(result.getByText("Bem-vindo de volta!")).toBeInTheDocument();
		expect(result.getByPlaceholderText("Insira seu e-mail")).toBeInTheDocument();
		expect(result.getByPlaceholderText("Insira a senha")).toBeInTheDocument();
		expect(result.getByText("Fazer Login")).toBeInTheDocument();
	});

	test("renders link to register page", () => {
		const result = renderWithProviders(<LoginForm />);
		const registerLink = result.getByText("Não tenho uma conta");

		expect(registerLink).toBeInTheDocument();
		expect(registerLink.closest("a")).toHaveAttribute("href", "/register");
	});

	test("updates email state when input changes", () => {
		const result = renderWithProviders(<LoginForm />);
		const emailInput = result.getByPlaceholderText(
			"Insira seu e-mail"
		) as HTMLInputElement;

		fireEvent.change(emailInput, { target: { value: "test@example.com" } });

		expect(emailInput.value).toBe("test@example.com");
	});

	test("updates password state when input changes", () => {
		const result = renderWithProviders(<LoginForm />);
		const passwordInput = result.getByPlaceholderText(
			"Insira a senha"
		) as HTMLInputElement;

		fireEvent.change(passwordInput, { target: { value: "password123" } });

		expect(passwordInput.value).toBe("password123");
	});

	test("shows validation error for invalid email", () => {
		const result = renderWithProviders(<LoginForm />);
		const emailInput = result.getByPlaceholderText("Insira seu e-mail");
		const submitButton = result.getByText("Fazer Login");

		fireEvent.change(emailInput, { target: { value: "invalid-email" } });
		fireEvent.click(submitButton);

		expect(mockSignIn).not.toHaveBeenCalled();
	});

	test("calls signIn with correct credentials on valid form submission", async () => {
		mockSignIn.mockResolvedValue({
			ok: true,
			error: null,
			url: "/delivery/date/test",
			status: 200,
		} as SignInResponse);

		const result = renderWithProviders(<LoginForm />);
		const emailInput = result.getByPlaceholderText("Insira seu e-mail");
		const passwordInput = result.getByPlaceholderText("Insira a senha");
		const submitButton = result.getByText("Fazer Login");

		fireEvent.change(emailInput, { target: { value: "test@example.com" } });
		fireEvent.change(passwordInput, { target: { value: "password123" } });
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(mockSignIn).toHaveBeenCalledWith(
				"credentials",
				expect.objectContaining({
					email: "test@example.com",
					password: "password123",
					redirect: false,
				})
			);
		});
	});

	test("disables submit button while submitting", async () => {
		mockSignIn.mockImplementation(
			() =>
				new Promise<SignInResponse>(resolve =>
					setTimeout(
						() =>
							resolve({
								ok: true,
								error: null,
								url: "/delivery/date/test",
								status: 200,
							} as SignInResponse),
						100
					)
				)
		);

		const result = renderWithProviders(<LoginForm />);
		const emailInput = result.getByPlaceholderText("Insira seu e-mail");
		const passwordInput = result.getByPlaceholderText("Insira a senha");
		const submitButton = result.getByText("Fazer Login") as HTMLButtonElement;

		fireEvent.change(emailInput, { target: { value: "test@example.com" } });
		fireEvent.change(passwordInput, { target: { value: "password123" } });
		fireEvent.click(submitButton);

		expect(submitButton.disabled).toBe(true);
	});

	test("handles email error from signIn response", async () => {
		mockSignIn.mockResolvedValue({
			ok: false,
			error: "E-mail não encontrado",
			url: null,
			status: 401,
		} as SignInResponse);

		const result = renderWithProviders(<LoginForm />);
		const emailInput = result.getByPlaceholderText("Insira seu e-mail");
		const passwordInput = result.getByPlaceholderText("Insira a senha");
		const submitButton = result.getByText("Fazer Login");

		fireEvent.change(emailInput, { target: { value: "test@example.com" } });
		fireEvent.change(passwordInput, { target: { value: "password123" } });
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(emailInput).toHaveClass("border-red-500");
		});
	});

	test("handles password error from signIn response", async () => {
		mockSignIn.mockResolvedValue({
			ok: false,
			error: "Senha incorreta",
			url: null,
			status: 401,
		} as SignInResponse);

		const result = renderWithProviders(<LoginForm />);
		const emailInput = result.getByPlaceholderText("Insira seu e-mail");
		const passwordInput = result.getByPlaceholderText("Insira a senha");
		const submitButton = result.getByText("Fazer Login");

		fireEvent.change(emailInput, { target: { value: "test@example.com" } });
		fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(passwordInput).toHaveClass("border-red-500");
		});
	});

	test("renders GoogleLogin component", () => {
		const result = renderWithProviders(<LoginForm />);
		const googleButton = result.getByText("Google");

		expect(googleButton).toBeInTheDocument();
	});
});
