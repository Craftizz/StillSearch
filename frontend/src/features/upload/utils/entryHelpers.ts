import type { UploadImageEntry } from "../types/UploadImageEntry";

export function createEntry(file: File): UploadImageEntry {
	return {
		file,
		preview: URL.createObjectURL(file),
		shotType: "",
		description: "",
	};
}

export function cleanupEntry(entry: UploadImageEntry): void {
	URL.revokeObjectURL(entry.preview);
}

export function cleanupEntries(entries: UploadImageEntry[]): void {
	entries.forEach(cleanupEntry);
}
