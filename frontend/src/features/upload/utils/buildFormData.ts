import type { UploadFormData } from "../types/UploadFormData";
import type { UploadImageEntry } from "../types/UploadImageEntry";

/**
 * Builds a FormData object for upload submission.
 *
 * @param formData - Project and team data
 * @param entries - Image entries with metadata
 * @returns FormData ready for API submission
 */
export function buildFormData(
	formData: UploadFormData,
	entries: UploadImageEntry[]
): FormData {
	const fd = new FormData();

	// Project data
	fd.append("title", formData.project.title);
	fd.append("category", formData.project.category);

	// Team data
	fd.append("director", formData.team.director);
	fd.append("cinematographer", formData.team.cinematographer);

	// Image metadata as JSON
	const imageMetadata = entries.map((entry) => ({
		shotType: entry.shotType,
		description: entry.description,
	}));
	fd.append("imageMetadata", JSON.stringify(imageMetadata));

	// Image files
	entries.forEach((entry) => {
		fd.append("images", entry.file, entry.file.name);
	});

	return fd;
}
