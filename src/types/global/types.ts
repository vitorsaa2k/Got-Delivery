export interface Motoboy {
	name: string;
	pix: string;
	id: string;
}

export interface Delivery {
	id: string;
	finalValue: number;
	neighborhood: string;
	source: SourceType;
	motoboy: Motoboy;
	motoboyId: string;
	date: Date;
}

export type SourceType = "Ifood" | "PedeAi" | "WhatsApp";
