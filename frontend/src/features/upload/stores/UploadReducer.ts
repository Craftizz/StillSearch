/**
 * @deprecated This file is deprecated. Use `uploadEntriesStore.ts` instead.
 * This reducer has been migrated to Zustand store for better state management.
 * Will be removed in a future version.
 */

import type { UploadImageEntry } from "../types/UploadImageEntry";

export type EditableField = keyof Omit<UploadImageEntry, "file" | "preview">;

export type UploadAction =
	| { type: "ADD"; entries: UploadImageEntry[] }
	| { type: "UPDATE"; index: number; field: EditableField; value: string }
	| { type: "REMOVE"; index: number }
	| { type: "CLEAR" };

function handleAdd(state: UploadImageEntry[], entries: UploadImageEntry[]): UploadImageEntry[] {
	return [...state, ...entries];
}

function handleUpdate(
	state: UploadImageEntry[],
	index: number,
	field: EditableField,
	value: string,
): UploadImageEntry[] {
	return state.map((entry, i) =>
		i === index ? { ...entry, [field]: value } : entry,
	);
}

function handleRemove(state: UploadImageEntry[], index: number): UploadImageEntry[] {
	return state.filter((_, i) => i !== index);
}

function handleClear(): UploadImageEntry[] {
	return [];
}

export function uploadReducer(
	state: UploadImageEntry[],
	action: UploadAction,
): UploadImageEntry[] {
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
