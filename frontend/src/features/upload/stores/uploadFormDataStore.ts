import { create } from "zustand";
import type {
	ProjectData,
	TeamData,
	UploadFormData,
} from "../types/UploadFormData";

type UploadFormDataState = {
	formData: UploadFormData;
};

type UploadFormDataActions = {
	updateProject: (data: Partial<ProjectData>) => void;
	updateTeam: (data: Partial<TeamData>) => void;
	reset: () => void;
};

type UploadFormDataStore = UploadFormDataState & UploadFormDataActions;

const initialFormData: UploadFormData = {
	project: {
		title: "",
		category: "",
	},
	team: {
		director: "",
		cinematographer: "",
	},
};

const initialState: UploadFormDataState = {
	formData: initialFormData,
};

export const useUploadFormDataStore = create<UploadFormDataStore>((set) => ({
	...initialState,

	updateProject: (data) => {
		set((state) => ({
			formData: {
				...state.formData,
				project: { ...state.formData.project, ...data },
			},
		}));
	},

	updateTeam: (data) => {
		set((state) => ({
			formData: {
				...state.formData,
				team: { ...state.formData.team, ...data },
			},
		}));
	},

	reset: () => {
		set(initialState);
	},
}));

// Selectors
export const selectFormData = (state: UploadFormDataStore) => state.formData;
export const selectProjectData = (state: UploadFormDataStore) =>
	state.formData.project;
export const selectTeamData = (state: UploadFormDataStore) =>
	state.formData.team;
