// global.d.ts or types/gtag.d.ts
export {};

declare global {
	interface Window {
		gtag: Gtag.Gtag;
	}
}

declare namespace Gtag {
	type Gtag = {
		(command: "js", config: Date): void;
		(command: "config", targetId: string, config?: ControlParams): void;
		(command: "event", eventName: string, eventParams?: EventParams): void;
	};

	interface ControlParams {
		send_to?: string;
		page_path?: string;
		[key: string]: unknown;
	}

	interface EventParams {
		event_category?: string;
		event_label?: string;
		value?: number;
		[key: string]: unknown;
	}
}
