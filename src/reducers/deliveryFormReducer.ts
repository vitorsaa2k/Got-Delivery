import { Delivery, SourceType } from "@/types/global/types";

export interface ReducerState {
	finalValue: number;
	neighborhood: string;
	source: SourceType;
}

export type Action =
	| { type: "update_delivery_value"; payload: number }
	| { type: "update_neighborhood"; payload: string }
	| { type: "update_source"; payload: SourceType }
	| { type: "update_delivery"; payload: Delivery };

function initReducer(delivery?: Delivery) {
	return (
		delivery ?? {
			finalValue: 0,
			neighborhood: "",
			source: "Ifood",
		}
	);
}

function reducer(state: ReducerState, action: Action): ReducerState {
	switch (action.type) {
		case "update_delivery":
			return {
				...action.payload,
			};
		case "update_delivery_value":
			return {
				...state,
				finalValue: action.payload,
			};
		case "update_neighborhood":
			return {
				...state,
				neighborhood: action.payload,
			};
		case "update_source":
			return {
				...state,
				source: action.payload,
			};
		default: {
			throw Error("Unknown type" + action);
		}
	}
}

export { initReducer, reducer };
