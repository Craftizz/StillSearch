import type { ImageEntry } from "../types/ImageEntry";
import type { EditableField, UploadAction } from "./UploadReducer";

export const uploadActions = {
	add: (entries: ImageEntry[]): UploadAction => ({
		type: "ADD",
		entries,
	}),

	update: (
		index: number,
		field: EditableField,
		value: string,
	): UploadAction => ({
		type: "UPDATE",
		index,
		field,
		value,
	}),

	remove: (index: number): UploadAction => ({
		type: "REMOVE",
		index,
	}),

	clear: (): UploadAction => ({
		type: "CLEAR",
	}),
};
