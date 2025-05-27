import { Motoboy, SourceType } from "./types";

export interface CreateMotoboy {
	name: string;
	pix: string;
	companyId: string;
}

export interface CreateDelivery {
	finalValue: number;
	neighborhood: string;
	source: SourceType;
	motoboy: Motoboy;
	motoboyId: string;
	date: Date;
	companyId: string;
}
