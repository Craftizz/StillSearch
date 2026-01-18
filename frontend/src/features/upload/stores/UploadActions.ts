/**
 * @deprecated This file is deprecated. Use `uploadEntriesStore.ts` instead.
 * Actions have been migrated to Zustand store methods.
 * Will be removed in a future version.
 */

import type { UploadImageEntry } from "../types/UploadImageEntry";
import type { EditableField, UploadAction } from "./UploadReducer";

export const uploadActions = {
	add: (entries: UploadImageEntry[]): UploadAction => ({
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
