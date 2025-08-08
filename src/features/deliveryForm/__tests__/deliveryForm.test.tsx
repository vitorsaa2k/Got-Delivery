import { DeliveryForm } from "..";
import { renderWithProviders } from "@/tests/utils";
import { mockFetch } from "../../../../__mocks__/mock-fetch";
import { fireEvent } from "@testing-library/dom";

beforeAll(() => {
	window.fetch = mockFetch({});
});

describe("delivery form fields", () => {
	test("form fields are in the document", async () => {
		const result = renderWithProviders(<DeliveryForm />);

		expect(result.getByTestId("deliveryValueInput")).toBeInTheDocument();
		expect(result.getByTestId("neighborhoodInput")).toBeInTheDocument();
		expect(result.getByTestId("sourceSelect")).toBeInTheDocument();
		expect(result.getByTestId("moboboyCombobox")).toBeInTheDocument();
	});

	test("only numbers are allowed in deliveryValue input", async () => {
		const result = renderWithProviders(<DeliveryForm />);
		const valueInput = result.getByTestId("deliveryValueInput");

		fireEvent.change(valueInput, {
			target: { value: "!@#$%^&*()-=_+[]{};:'\",./<>?|\\`~abc" },
		});
		expect(valueInput).toHaveValue("0");

		fireEvent.change(valueInput, {
			target: { value: 2 },
		});
		expect(valueInput).toHaveValue("2");
	});

	test("it's possible to type in neighborhood input", async () => {
		const testText = "test";
		const result = renderWithProviders(<DeliveryForm />);
		const neighborhoodInput = result.getByTestId("neighborhoodInput");

		fireEvent.change(neighborhoodInput, {
			target: { value: testText },
		});
		expect(neighborhoodInput).toHaveValue(testText);
	});

	test("source select shows all three options when clicked", async () => {
		const result = renderWithProviders(<DeliveryForm />);
		const sourceSelector = result.getByTestId("sourceSelect");

		fireEvent.click(sourceSelector);

		expect(result.getByTestId("itemIfood")).toBeInTheDocument();
		expect(result.getByTestId("itemPedeai")).toBeInTheDocument();
		expect(result.getByTestId("itemWhatsapp")).toBeInTheDocument();
	});

	test("source select three options should not be on screen if not clicked", async () => {
		const result = renderWithProviders(<DeliveryForm />);

		expect(result.queryByTestId("itemIfood")).not.toBeInTheDocument();
		expect(result.queryByTestId("itemPedeai")).not.toBeInTheDocument();
		expect(result.queryByTestId("itemWhatsapp")).not.toBeInTheDocument();
	});

	test("it's possible to select PedeAi", async () => {
		const result = renderWithProviders(<DeliveryForm />);
		const sourceSelector = result.getByTestId("sourceSelect");
		fireEvent.click(sourceSelector);
		expect(result.getByTestId("itemIfood")).toBeInTheDocument();
		expect(result.getByTestId("itemPedeai")).toBeInTheDocument();
		expect(result.getByTestId("itemWhatsapp")).toBeInTheDocument();

		const pedeaiSelector = result.getByTestId("itemPedeai");
		fireEvent.click(pedeaiSelector);

		expect(result.queryByTestId("itemIfood")).not.toBeInTheDocument();
		expect(result.queryByTestId("itemPedeai")).not.toBeInTheDocument();
		expect(result.queryByTestId("itemWhatsapp")).not.toBeInTheDocument();
		expect(result.getByText("PedeAi")).toBeInTheDocument();
	});

	test("it's possible to select WhatsApp", async () => {
		const result = renderWithProviders(<DeliveryForm />);
		const sourceSelector = result.getByTestId("sourceSelect");
		fireEvent.click(sourceSelector);
		expect(result.getByTestId("itemIfood")).toBeInTheDocument();
		expect(result.getByTestId("itemPedeai")).toBeInTheDocument();
		expect(result.getByTestId("itemWhatsapp")).toBeInTheDocument();

		const pedeaiSelector = result.getByTestId("itemWhatsapp");
		fireEvent.click(pedeaiSelector);

		expect(result.queryByTestId("itemIfood")).not.toBeInTheDocument();
		expect(result.queryByTestId("itemPedeai")).not.toBeInTheDocument();
		expect(result.queryByTestId("itemWhatsapp")).not.toBeInTheDocument();
		expect(result.getByText("WhatsApp")).toBeInTheDocument();
	});

	test("it's possible to select Ifood", async () => {
		const result = renderWithProviders(<DeliveryForm />);
		const sourceSelector = result.getByTestId("sourceSelect");
		fireEvent.click(sourceSelector);
		expect(result.getByTestId("itemIfood")).toBeInTheDocument();
		expect(result.getByTestId("itemPedeai")).toBeInTheDocument();
		expect(result.getByTestId("itemWhatsapp")).toBeInTheDocument();

		const pedeaiSelector = result.getByTestId("itemIfood");
		fireEvent.click(pedeaiSelector);

		expect(result.queryByTestId("itemIfood")).not.toBeInTheDocument();
		expect(result.queryByTestId("itemPedeai")).not.toBeInTheDocument();
		expect(result.queryByTestId("itemWhatsapp")).not.toBeInTheDocument();
		expect(result.getByText("Ifood")).toBeInTheDocument();
	});
});
