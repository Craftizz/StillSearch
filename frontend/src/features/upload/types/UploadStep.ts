export type StepId = "project" | "team" | "stills" | "review";

export type StepConfig = {
	id: StepId;
	title: string;
	description: string;
	isOptional: boolean;
};

export const STEPS: StepConfig[] = [
	{
		id: "project",
		title: "Project Info",
		description: "Basic project details",
		isOptional: false,
	},
	{
		id: "team",
		title: "Team Credits",
		description: "Add your team members",
		isOptional: true,
	},
	{
		id: "stills",
		title: "Upload Stills",
		description: "Add your images",
		isOptional: false,
	},
	{
		id: "review",
		title: "Review",
		description: "Review and submit",
		isOptional: false,
	},
];
