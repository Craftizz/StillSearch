import { useCallback, useEffect, useReducer } from "react";
import { uploadActions } from "../stores/UploadActions";
import { type EditableField, uploadReducer } from "../stores/UploadReducer";
import { cleanupEntries, cleanupEntry, createEntry } from "../utils/entryHelpers";

export function useUploadEntries() {
	const [entries, dispatch] = useReducer(uploadReducer, []);

	const addFiles = useCallback((files: File[]) => {
		const newEntries = files.map(createEntry);
		dispatch(uploadActions.add(newEntries));
	}, []);

	const updateEntry = useCallback(
		(index: number, field: EditableField, value: string) => {
			dispatch(uploadActions.update(index, field, value));
		},
		[],
	);

	const removeEntry = useCallback(
		(index: number) => {
			const entry = entries[index];
			if (entry) {
				cleanupEntry(entry);
			}
			dispatch(uploadActions.remove(index));
		},
		[entries],
	);

	const clearEntries = useCallback(() => {
		cleanupEntries(entries);
		dispatch(uploadActions.clear());
	}, [entries]);

	useEffect(() => {
		return () => {
			cleanupEntries(entries);
		};
	}, [entries]);

	return {
		entries,
		addFiles,
		updateEntry,
		removeEntry,
		clearEntries,
	};
}
