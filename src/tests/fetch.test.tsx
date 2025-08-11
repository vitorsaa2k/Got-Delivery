import { fetchAllMotoboys } from "@/services/motoboy";
import { motoboyMockArray } from "./mocks/motoboy";

describe("motoboy service functions", () => {
	test("fetch all motoboys", async () => {
		const res = await fetchAllMotoboys("123");

		expect(res).toEqual(motoboyMockArray);
	});
});
