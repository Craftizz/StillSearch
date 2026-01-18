"use client";

import { Tabs } from "@base-ui/react/tabs";
import CameraIcon from "@/components/icons/CameraIcon";
import { useUploadEntries } from "../hooks/useUploadEntries";
import Dropzone from "./Dropzone";
import EntryList from "./EntryList";
import styles from './UploadImageTabs.module.css';

export default function UploadImageTabs() {

    const { entries, addFiles, updateEntry, removeEntry } = useUploadEntries();

    return(
        <Tabs.Root className={styles.tabs} defaultValue="stills">
			<Tabs.List className={styles.tabsList}>
				<Tabs.Tab className={styles.tab} value="stills">
					<CameraIcon size={12} /> Stills
				</Tabs.Tab>
				<Tabs.Indicator className={styles.indicator} />
			</Tabs.List>
			<Tabs.Panel className={styles.panel} value="stills">
				<EntryList
					entries={entries}
					onUpdate={updateEntry}
					onRemove={removeEntry}
				/>
				<Dropzone onDrop={addFiles} />
			</Tabs.Panel>
		</Tabs.Root>
    )
}