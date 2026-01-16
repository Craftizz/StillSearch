import type { ImageEntry } from "../types/ImageEntry";

export type EditableField = keyof Omit<ImageEntry, "file" | "preview">;

export type UploadAction =
	| { type: "ADD"; entries: ImageEntry[] }
	| { type: "UPDATE"; index: number; field: EditableField; value: string }
	| { type: "REMOVE"; index: number }
	| { type: "CLEAR" };

function handleAdd(state: ImageEntry[], entries: ImageEntry[]): ImageEntry[] {
	return [...state, ...entries];
}

function handleUpdate(
	state: ImageEntry[],
	index: number,
	field: EditableField,
	value: string,
): ImageEntry[] {
	return state.map((entry, i) =>
		i === index ? { ...entry, [field]: value } : entry,
	);
}

function handleRemove(state: ImageEntry[], index: number): ImageEntry[] {
	return state.filter((_, i) => i !== index);
}

function handleClear(): ImageEntry[] {
	return [];
}

export function uploadReducer(
	state: ImageEntry[],
	action: UploadAction,
): ImageEntry[] {
	switch (action.type) {
		case "ADD":
			return handleAdd(state, action.entries);
		case "UPDATE":
			return handleUpdate(state, action.index, action.field, action.value);
		case "REMOVE":
			return handleRemove(state, action.index);
		case "CLEAR":
			return handleClear();
		default:
			return state;
	}
}
