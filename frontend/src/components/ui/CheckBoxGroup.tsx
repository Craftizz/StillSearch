
import { CheckboxGroup as BaseCheckBoxGroup } from '@base-ui/react';

import styles from './CheckBoxGroup.module.css';

export function CheckBoxGroup({ className, ...props }: BaseCheckBoxGroup.Props) {
    return (
        <BaseCheckBoxGroup
            className={`${className} ${styles.checkbox}`}
            {...props}
        />
    )
}