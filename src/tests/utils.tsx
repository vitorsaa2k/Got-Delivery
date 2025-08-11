import { render } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { motoboyMockArray } from "./mocks/motoboy";
import { SessionProvider } from "next-auth/react";

export const handlers = [
	http.get(`/api/motoboy`, ({ request }) => {
		const url = new URL(request.url);
		const companyId = url.searchParams.get("id");
		console.log(companyId);
		return HttpResponse.json(motoboyMockArray);
	}),
	http.get(`/api/auth/session`, () => {
		return HttpResponse.json({
			data: { user: { name: "testName", id: "123" } },
		});
	}),
	http.get(`/api/delivery/123`, () => {
		return HttpResponse.json([]);
	}),
];

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
