export default function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			width={16}
			height={16}
			viewBox="0 0 16 16"
			strokeLinejoin="round"
			data-testid="geist-icon"
			style={{ color: "currentcolor" }}
			{...props}
		>
			<title id="svg-title">Menu icon</title>
			<path
				fill="currentColor"
				fillRule="evenodd"
				clipRule="evenodd"
				d="M1 2H1.75H14.25H15V3.5H14.25H1.75H1V2ZM1 12.5H1.75H14.25H15V14H14.25H1.75H1V12.5ZM1.75 7.25H1V8.75H1.75H14.25H15V7.25H14.25H1.75Z"
			/>
		</svg>
	);
}
