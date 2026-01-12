import React from "react";

type PlusIconProps = React.SVGProps<SVGSVGElement> & {
	size?: number | string;
};

export default function PlusIcon({ size = 16, ...props }: PlusIconProps) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 16 16"
			strokeLinejoin="round"
			data-testid="geist-icon"
			style={{ color: "currentcolor" }}
			{...props}
		>
			<title id="svg-title">Plus</title>
			<path
				fill="currentColor"
				fillRule="evenodd"
				clipRule="evenodd"
				d="M 8.75,1 H7.25 V7.25 H1.5 V8.75 H7.25 V15 H8.75 V8.75 H14.5 V7.25 H8.75 V1.75 Z"
			/>
		</svg>
	);
}