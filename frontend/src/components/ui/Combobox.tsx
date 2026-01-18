
import { Combobox as BaseCombobox } from "@base-ui/react";

import styles from "./Combobox.module.css";

export default function Combobox({ items }: { items: string[] }) {
    return (
        <BaseCombobox.Root items={items}>
            <BaseCombobox.Input className={styles.input} placeholder="Select an option..." />
        </BaseCombobox.Root>
    )
}