"use client";

import { Field } from "@base-ui/react/field";
import { Tabs } from "@base-ui/react/tabs";
import InfoIcon from "@/components/icons/InfoIcon";
import UserIcon from "@/components/icons/UserIcon";
import Input from "@/components/ui/Input";
import styles from "./UploadDetailsTabs.module.css";

export default function UploadDetailsTabs() {
	return (
		<Tabs.Root className={styles.tabs} defaultValue="overview">
			<Tabs.List className={styles.tabsList}>
				<Tabs.Tab className={styles.tab} value="overview">
					<InfoIcon size={12} /> Overview
				</Tabs.Tab>
				<Tabs.Tab className={styles.tab} value="team">
					<UserIcon size={12} /> Team
				</Tabs.Tab>
				<Tabs.Indicator className={styles.indicator} />
			</Tabs.List>
			<Tabs.Panel className={styles.panel} value="overview" keepMounted>
				<Field.Root className={styles.formField} name="projectTitle">
					<Field.Label className={styles.formLabel}>Project Title</Field.Label>
					<Field.Control
						render={<Input size="small" />}
						placeholder="Project Title"
						type="text"
						autoComplete="off"
						required
					/>
				</Field.Root>
                <Field.Root className={styles.formField} name="category">
					<Field.Label className={styles.formLabel}>Category</Field.Label>
					<Field.Control
						render={<Input size="small" />}
						placeholder="Category"
						type="text"
						autoComplete="off"
						required
					/>
				</Field.Root>
            
			</Tabs.Panel>

			<Tabs.Panel className={styles.panel} value="team" keepMounted>
				<Field.Root className={styles.formField} name="director">
					<Field.Label className={styles.formLabel}>Director</Field.Label>
					<Field.Control
						render={<Input size="small" />}
						placeholder="Director"
						type="text"
						autoComplete="off"
						required
					/>
				</Field.Root>
                <Field.Root className={styles.formField} name="cinematographer">
					<Field.Label className={styles.formLabel}>Cinematographer</Field.Label>
					<Field.Control
						render={<Input size="small" />}
						placeholder="Cinematographer"
						type="text"
						autoComplete="off"
						required
					/>
				</Field.Root>
			</Tabs.Panel>
		</Tabs.Root>
	);
}
