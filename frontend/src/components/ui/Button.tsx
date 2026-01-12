import { Button as BaseButton } from "@base-ui/react/button";

import styles from "./Button.module.css";

export type ButtonSize = "thin" | "small" | "medium" | "large";
export type ButtonVariant = "primary" | "secondary" | "outline" | "transparent";

export interface BaseButtonProps {
	size?: ButtonSize;
	variant?: ButtonVariant;
	children: React.ReactNode;
	className?: string;
	prefix?: React.ReactNode;
	suffix?: React.ReactNode;
}

export function getButtonClasses(
	size: ButtonSize = "medium",
	variant: ButtonVariant = "primary",
	className?: string,
): string {
	return [styles.button, styles[size], styles[variant], className]
		.filter(Boolean)
		.join(" ");
}

interface ButtonProps
	extends Omit<BaseButtonProps, "children">,
		Omit<
			React.ButtonHTMLAttributes<HTMLButtonElement>,
			"className" | "prefix" | "suffix"
		> {
	children: React.ReactNode;
}

export default function Button({
	size = "medium",
	variant = "primary",
	children,
	className,
	prefix,
	suffix,
	...props
}: ButtonProps) {
	return (
		<BaseButton className={getButtonClasses(size, variant, className)} {...props}>
			{prefix && <span className={styles.prefix}>{prefix}</span>}
			{children}
			{suffix && <span className={styles.suffix}>{suffix}</span>}
		</BaseButton>
	);
}
