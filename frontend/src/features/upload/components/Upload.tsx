"use client";

import { Field } from "@base-ui/react/field";
import { Form } from "@base-ui/react/form";
import Input from "@/components/ui/Input";
import { useUploadEntries } from "../hooks/useUploadEntries";
import Dropzone from "./Dropzone";
import EntryList from "./EntryList";
import styles from "./Upload.module.css";
import UploadDetailsTabs from "./UploadDetailsTabs";
import UploadImageTabs from "./UploadImageTabs";

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
			<div className={styles.content}>
				<div className={styles.heading}>
					<h1 className={styles.headingTitle}>Upload Project</h1>
					<p className={styles.headingSubtitle}>Start sharing your film frames</p>
				</div>
				<Form className={styles.form} onSubmit={handleSubmit}>
					<UploadDetailsTabs />
					<UploadImageTabs />
				</Form>

				{/* <Dropzone onDrop={addFiles} />

				<EntryList
					entries={entries}
					onUpdate={updateEntry}
					onRemove={removeEntry}
				/>

				{entries.length > 0 && (
					<button type="button" onClick={handleSubmit} className={styles.submitBtn}>
						Upload All
					</button>
				)} */}
			</div>
		</div>
	);
}
