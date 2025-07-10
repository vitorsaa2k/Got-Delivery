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
	data: { verificationCode: VerificationCode };
}

export interface RegisterResponse {
	error?: {
		email?: string[];
		name?: string[];
		password?: string[];
	};
}

export interface VerificationCode {
	id: string;
	verificationCode: number;
	companyId: string;
}

export type SourceType = "Ifood" | "PedeAi" | "WhatsApp";
