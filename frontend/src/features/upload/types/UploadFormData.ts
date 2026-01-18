export type ProjectData = {
	title: string;
	category: string;
};

export type TeamData = {
	director: string;
	cinematographer: string;
};

export type UploadFormData = {
	project: ProjectData;
	team: TeamData;
};
