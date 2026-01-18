import type { EditableField } from "../stores/UploadReducer";
import type { UploadImageEntry } from "../types/UploadImageEntry";
import EntryCard from "./EntryCard";
import styles from "./EntryList.module.css";

type EntryListProps = {
	entries: UploadImageEntry[];
	onUpdate: (index: number, field: EditableField, value: string) => void;
	onRemove: (index: number) => void;
};

export default function EntryList({
	entries,
	onUpdate,
	onRemove,
}: EntryListProps) {
	if (entries.length === 0) {
		return null;
	}

	return (
		<ul className={styles.previewGrid}>
			{entries.map((entry, index) => (
				<EntryCard
					key={`${entry.file.name}-${index}`}
					entry={entry}
					index={index}
					onUpdate={onUpdate}
					onRemove={onRemove}
				/>
			))}
		</ul>
	);
}
