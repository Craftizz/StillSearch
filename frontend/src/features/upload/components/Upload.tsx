"use client";

import { useUploadEntries } from "../hooks/useUploadEntries";
import Dropzone from "./Dropzone";
import EntryList from "./EntryList";
import styles from "./Upload.module.css";

export default function Upload() {
	const { entries, addFiles, updateEntry, removeEntry } = useUploadEntries();

	function handleSubmit() {
		// TODO: Implement upload logic

        // new FormData();
        // entries.forEach()

        // fetch
	}

	return (
		<div className={styles.container}>
			<Dropzone onDrop={addFiles} />

			<EntryList
				entries={entries}
				onUpdate={updateEntry}
				onRemove={removeEntry}
			/>

			{entries.length > 0 && (
				<button type="button" onClick={handleSubmit} className={styles.submitBtn}>
					Upload All
				</button>
			)}
		</div>
	);
}
