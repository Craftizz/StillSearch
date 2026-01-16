import type { ImageEntry } from "../types/ImageEntry";

export function createEntry(file: File): ImageEntry {
	return {
		file,
		preview: URL.createObjectURL(file),
		shotType: "",
		description: "",
	};
}

export function cleanupEntry(entry: ImageEntry): void {
	URL.revokeObjectURL(entry.preview);
}

export function cleanupEntries(entries: ImageEntry[]): void {
	entries.forEach(cleanupEntry);
}
