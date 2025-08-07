import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

const createTestQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});

export function renderWithProviders(ui: React.ReactElement) {
	const testQueryClient = createTestQueryClient();
	const { rerender, ...result } = render(
		<SessionProvider>
			<QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
		</SessionProvider>
	);
	return {
		...result,
		rerender: (rerenderUi: React.ReactElement) =>
			rerender(
				<SessionProvider>
					<QueryClientProvider client={testQueryClient}>
						{rerenderUi}
					</QueryClientProvider>
				</SessionProvider>
			),
	};
}
