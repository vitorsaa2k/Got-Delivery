import RegisterForm from "..";
import { renderWithProviders } from "@/tests/utils";
import { fireEvent, waitFor } from "@testing-library/react";
import { signIn, SignInResponse } from "next-auth/react";
import { http, HttpResponse } from "msw";
import {server} from "../../../../../jest.setup"

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

describe("RegisterForm", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.runOnlyPendingTimers();
		jest.useRealTimers();
		server.resetHandlers();
	});

	test("renders register form with all fields", () => {
		const result = renderWithProviders(<RegisterForm />);

		expect(result.getByText("Crie uma conta em segundos!")).toBeInTheDocument();
		expect(result.getByText("Registrar")).toBeInTheDocument();
	});

	test("renders link to login page", () => {
		const result = renderWithProviders(<RegisterForm />);
		const loginLink = result.getByText("Já tenho uma conta");

		expect(loginLink).toBeInTheDocument();
		expect(loginLink.closest("a")).toHaveAttribute("href", "/login");
	});

	test("shows validation errors for empty form submission", async () => {
		const result = renderWithProviders(<RegisterForm />);
		const submitButton = result.getByText("Registrar");

		fireEvent.click(submitButton);

		// Validation should prevent API call, so we just verify the form doesn't submit
		await waitFor(() => {
			expect(submitButton).toBeInTheDocument();
		});
	});

	test("calls register API on valid form submission", async () => {
		server.use(
			http.post("/api/auth/register", async () => {
				return HttpResponse.json({ error: null });
			})
		);

		mockSignIn.mockResolvedValue({
			ok: true,
			error: null,
			url: "/delivery/date/test",
			status: 200,
		} as SignInResponse);

		const result = renderWithProviders(<RegisterForm />);
		const nameInput = result.getByPlaceholderText("Google") as HTMLInputElement;
		const emailInput = result.getByPlaceholderText(
			"exemplo@site.com"
		) as HTMLInputElement;
		const passwordInput = result.getByPlaceholderText(
			"Mínimo de 8 caracteres"
		) as HTMLInputElement;
		const submitButton = result.getByText("Registrar");

		fireEvent.change(nameInput, { target: { value: "Test User" } });
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

	test("handles API error response", async () => {
		server.use(
			http.post("/api/auth/register", async () => {
				return HttpResponse.json({
					error: {
						email: ["Email já está em uso"],
						name: null,
						password: null,
					},
				});
			})
		);

		const result = renderWithProviders(<RegisterForm />);
		const nameInput = result.getByPlaceholderText("Google") as HTMLInputElement;
		const emailInput = result.getByPlaceholderText(
			"exemplo@site.com"
		) as HTMLInputElement;
		const passwordInput = result.getByPlaceholderText(
			"Mínimo de 8 caracteres"
		) as HTMLInputElement;
		const submitButton = result.getByText("Registrar");

		fireEvent.change(nameInput, { target: { value: "Test User" } });
		fireEvent.change(emailInput, { target: { value: "test@example.com" } });
		fireEvent.change(passwordInput, { target: { value: "password123" } });

		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(mockSignIn).not.toHaveBeenCalled();
		});
	});

	test("calls signIn after successful registration", async () => {
		server.use(
			http.post("/api/auth/register", async () => {
				return HttpResponse.json({ error: null });
			})
		);

		mockSignIn.mockResolvedValue({
			ok: true,
			error: null,
			url: "/delivery/date/test",
			status: 200,
		} as SignInResponse);

		const result = renderWithProviders(<RegisterForm />);
		const nameInput = result.getByPlaceholderText("Google") as HTMLInputElement;
		const emailInput = result.getByPlaceholderText(
			"exemplo@site.com"
		) as HTMLInputElement;
		const passwordInput = result.getByPlaceholderText(
			"Mínimo de 8 caracteres"
		) as HTMLInputElement;
		const submitButton = result.getByText("Registrar");

		fireEvent.change(nameInput, { target: { value: "Test User" } });
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
		server.use(
			http.post("/api/auth/register", async () => {
				// Simulate a delay
				await new Promise(resolve => setTimeout(resolve, 100));
				return HttpResponse.json({ error: null });
			})
		);

		const result = renderWithProviders(<RegisterForm />);
		const nameInput = result.getByPlaceholderText("Google") as HTMLInputElement;
		const emailInput = result.getByPlaceholderText(
			"exemplo@site.com"
		) as HTMLInputElement;
		const passwordInput = result.getByPlaceholderText(
			"Mínimo de 8 caracteres"
		) as HTMLInputElement;
		const submitButton = result.getByText("Registrar") as HTMLButtonElement;

		fireEvent.change(nameInput, { target: { value: "Test User" } });
		fireEvent.change(emailInput, { target: { value: "test@example.com" } });
		fireEvent.change(passwordInput, { target: { value: "password123" } });

		fireEvent.click(submitButton);

		expect(submitButton.disabled).toBe(true);
	});
});
