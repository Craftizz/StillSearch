import type { EditableField } from "../stores/UploadReducer";
import type { ImageEntry } from "../types/ImageEntry";
import styles from "./Upload.module.css";

type EntryCardProps = {
	entry: ImageEntry;
	index: number;
	onUpdate: (index: number, field: EditableField, value: string) => void;
	onRemove: (index: number) => void;
};

export default function EntryCard({
	entry,
	index,
	onUpdate,
	onRemove,
}: EntryCardProps) {
	return (
		<li className={styles.previewItem}>
			<img
				src={entry.preview}
				alt={entry.file.name}
				className={styles.previewImage}
			/>
			<input
				type="text"
				placeholder="Shot type"
				value={entry.shotType}
				onChange={(e) => onUpdate(index, "shotType", e.target.value)}
				className={styles.input}
			/>
			<input
				type="text"
				placeholder="Description"
				value={entry.description}
				onChange={(e) => onUpdate(index, "description", e.target.value)}
				className={styles.input}
			/>
			<button type="button" onClick={() => onRemove(index)}>
				Remove
			</button>
		</li>
	);
}
