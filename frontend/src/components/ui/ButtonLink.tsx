import Link from "next/link";
import type { ComponentProps } from "react";
import { type BaseButtonProps, getButtonClasses } from "./Button";
import styles from "./Button.module.css";

interface ButtonLinkProps extends Omit<BaseButtonProps, "children">, Omit<ComponentProps<typeof Link>, "className" | "prefix"> {
	children: React.ReactNode;
}

export default function ButtonLink({
	size = "medium",
	variant = "primary",
	children,
	className,
	prefix,
	suffix,
	...props
}: ButtonLinkProps) {
	return (
		<Link className={getButtonClasses(size, variant, className)} {...props}>
			{prefix && <span className={styles.prefix}>{prefix}</span>}
			{children}
			{suffix && <span className={styles.suffix}>{suffix}</span>}
		</Link>
	);
}
