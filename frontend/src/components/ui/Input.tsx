import { Input as BaseInput } from "@base-ui/react/input";
import styles from "./Input.module.css";

export type InputSize = "small" | "medium" | "large";
export type InputVariant = "primary";

export interface BaseInputProps {
	size?: InputSize;
	variant?: InputVariant;
	className?: string;
}

interface InputProps
	extends Omit<BaseInputProps, "children">,
		Omit<
			React.InputHTMLAttributes<HTMLInputElement>,
			"className" | "size"
		> {
}

export function getInputClasses(
	size: InputSize = "medium",
	variant: InputVariant = "primary",
	className?: string,
): string {
	return [styles.input, styles[size], styles[variant], className]
		.filter(Boolean)
		.join(" ");
}

export default function Input({
	size = "medium",
	variant = "primary",
	className,
	...props
}: InputProps) {
	return (
		<BaseInput
			className={getInputClasses(size, variant, className)}
			{...props}
		/>
	);
}
