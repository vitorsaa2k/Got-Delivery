export interface Motoboy {
	name: string;
	pix: string;
	id: string;
	companyId: string;
}

export interface Delivery {
	id: string;
	finalValue: number;
	neighborhood: string;
	source: SourceType;
	motoboy: Motoboy;
	motoboyId: string;
	date: Date;
	companyId: string;
}

export interface ApiResponse {
	error?: string;
}

export interface DashboardResume {
	deliveriesLastWeek: Delivery[];
	deliveriesLastMonth: Delivery[];
}

export type SourceType = "Ifood" | "PedeAi" | "WhatsApp";
