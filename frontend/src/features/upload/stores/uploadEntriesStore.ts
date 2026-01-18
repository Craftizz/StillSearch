import { create } from "zustand";
import type { UploadImageEntry } from "../types/UploadImageEntry";
import {
	cleanupEntries,
	cleanupEntry,
	createEntry,
} from "../utils/entryHelpers";

export type EditableImageField = keyof Omit<UploadImageEntry, "file" | "preview">;

type UploadEntriesState = {
	entries: UploadImageEntry[];
};

type UploadEntriesActions = {
	addFiles: (files: File[]) => void;
	updateEntry: (index: number, field: EditableImageField, value: string) => void;
	removeEntry: (index: number) => void;
	clearEntries: () => void;
};

type UploadEntriesStore = UploadEntriesState & UploadEntriesActions;

const initialState: UploadEntriesState = {
	entries: [],
};

export const useUploadEntriesStore = create<UploadEntriesStore>((set, get) => ({
	...initialState,

	addFiles: (files) => {
		const newEntries = files.map(createEntry);
		set((state) => ({
			entries: [...state.entries, ...newEntries],
		}));
	},

	updateEntry: (index, field, value) => {
		set((state) => ({
			entries: state.entries.map((entry, i) =>
				i === index ? { ...entry, [field]: value } : entry
			),
		}));
	},

	removeEntry: (index) => {
		const entry = get().entries[index];
		if (entry) {
			cleanupEntry(entry);
		}
		set((state) => ({
			entries: state.entries.filter((_, i) => i !== index),
		}));
	},

	clearEntries: () => {
		cleanupEntries(get().entries);
		set({ entries: [] });
	},
}));

// Selectors
export const selectEntries = (state: UploadEntriesStore) => state.entries;
export const selectEntriesCount = (state: UploadEntriesStore) =>
	state.entries.length;
export const selectHasEntries = (state: UploadEntriesStore) =>
	state.entries.length > 0;
