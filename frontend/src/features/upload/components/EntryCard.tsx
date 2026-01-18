import { Field } from "@base-ui/react/field";
import Input from "@/components/ui/Input";
import type { EditableField } from "../stores/UploadReducer";
import type { UploadImageEntry } from "../types/UploadImageEntry";
import styles from "./EntryCard.module.css";

type EntryCardProps = {
	entry: UploadImageEntry;
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
			<Field.Root className={styles.formField} name="shotType">
				<Field.Label className={styles.formLabel}>Shot Type</Field.Label>
				<Field.Control
					render={<Input size="small" />}
					placeholder="Select Shot Type"
					type="text"
					autoComplete="off"
					onChange={(e) => onUpdate(index, "shotType", e.target.value)}
					required
				/>
			</Field.Root>
			<Field.Root className={styles.formField} name="shotSize">
				<Field.Label className={styles.formLabel}>Shot Size</Field.Label>
				<Field.Control
					render={<Input size="small" />}
					placeholder="Select Shot Size"
					type="text"
					autoComplete="off"
					// onChange={(e) => onUpdate(index, "shotSize", e.target.value)}
					required
				/>
			</Field.Root>

			<button
				type="button"
				onClick={() => onRemove(index)}
				className={styles.removeBtn}
			>
				Remove
			</button>
		</li>
	);
}
