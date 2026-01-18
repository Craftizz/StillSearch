/**
 * @deprecated This store is deprecated. Use the separated stores instead:
 * - `uploadStepStore.ts` - Step navigation
 * - `uploadFormDataStore.ts` - Project & team data
 * - `uploadEntriesStore.ts` - Image entries
 * - `useUploadForm` hook - Composite orchestration
 *
 * This monolithic store has been split for better separation of concerns.
 * Will be removed in a future version.
 */

import { create } from "zustand";
import type { UploadImageEntry } from "../types/UploadImageEntry";
import {
	cleanupEntries,
	cleanupEntry,
	createEntry,
} from "../utils/entryHelpers";

// ============================================================================
// Types
// ============================================================================

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

export type EditableImageField = keyof Omit<UploadImageEntry, "file" | "preview">;

export type StepId = "project" | "team" | "stills" | "review";

export type StepConfig = {
	id: StepId;
	title: string;
	description: string;
	isOptional: boolean;
};

// ============================================================================
// Constants
// ============================================================================

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

// ============================================================================
// Store Types
// ============================================================================

type UploadFormState = {
	// Step navigation
	currentStep: number;

	// Form data
	formData: UploadFormData;

	// Image entries (ported from UploadReducer)
	entries: UploadImageEntry[];
};

type UploadFormActions = {
	// Step navigation
	nextStep: () => void;
	prevStep: () => void;
	goToStep: (step: number) => void;
	canProceed: () => boolean;

	// Form data updates
	updateProject: (data: Partial<ProjectData>) => void;
	updateTeam: (data: Partial<TeamData>) => void;

	// Image entries (ported from UploadReducer)
	addFiles: (files: File[]) => void;
	updateEntry: (index: number, field: EditableImageField, value: string) => void;
	removeEntry: (index: number) => void;
	clearEntries: () => void;

	// Form submission
	getFormDataForSubmit: () => FormData;

	// Reset
	reset: () => void;
};

type UploadFormStore = UploadFormState & UploadFormActions;

// ============================================================================
// Initial State
// ============================================================================

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

const initialState: UploadFormState = {
	currentStep: 0,
	formData: initialFormData,
	entries: [],
};

// ============================================================================
// Store
// ============================================================================

export const useUploadFormStore = create<UploadFormStore>((set, get) => ({
	// ---------------------------------------------------------------------------
	// State
	// ---------------------------------------------------------------------------
	...initialState,

	// ---------------------------------------------------------------------------
	// Step Navigation
	// ---------------------------------------------------------------------------
	nextStep: () => {
		const { currentStep, canProceed } = get();
		if (canProceed() && currentStep < STEPS.length - 1) {
			set({ currentStep: currentStep + 1 });
		}
	},

	prevStep: () => {
		const { currentStep } = get();
		if (currentStep > 0) {
			set({ currentStep: currentStep - 1 });
		}
	},

	goToStep: (step: number) => {
		if (step >= 0 && step < STEPS.length) {
			set({ currentStep: step });
		}
	},

	canProceed: () => {
		const { currentStep, formData, entries } = get();
		const step = STEPS[currentStep];

		switch (step.id) {
			case "project":
				return (
					formData.project.title.trim() !== "" &&
					formData.project.category.trim() !== ""
				);
			case "team":
				// Optional step, can always proceed
				return true;
			case "stills":
				return entries.length > 0;
			case "review":
				return true;
			default:
				return false;
		}
	},

	// ---------------------------------------------------------------------------
	// Form Data Updates
	// ---------------------------------------------------------------------------
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

	// ---------------------------------------------------------------------------
	// Image Entries (Ported from UploadReducer)
	// ---------------------------------------------------------------------------
	addFiles: (files) => {
		const newEntries = files.map(createEntry);
		set((state) => ({
			entries: [...state.entries, ...newEntries],
		}));
	},

	updateEntry: (index, field, value) => {
		set((state) => ({
			entries: state.entries.map((entry, i) =>
				i === index ? { ...entry, [field]: value } : entry
			),
		}));
	},

	removeEntry: (index) => {
		const entry = get().entries[index];
		if (entry) {
			cleanupEntry(entry);
		}
		set((state) => ({
			entries: state.entries.filter((_, i) => i !== index),
		}));
	},

	clearEntries: () => {
		cleanupEntries(get().entries);
		set({ entries: [] });
	},

	// ---------------------------------------------------------------------------
	// Form Submission
	// ---------------------------------------------------------------------------
	getFormDataForSubmit: () => {
		const { formData, entries } = get();
		const fd = new FormData();

		// Project data
		fd.append("title", formData.project.title);
		fd.append("category", formData.project.category);

		// Team data
		fd.append("director", formData.team.director);
		fd.append("cinematographer", formData.team.cinematographer);

		// Image metadata as JSON
		const imageMetadata = entries.map((entry) => ({
			shotType: entry.shotType,
			description: entry.description,
		}));
		fd.append("imageMetadata", JSON.stringify(imageMetadata));

		// Image files
		entries.forEach((entry) => {
			fd.append("images", entry.file, entry.file.name);
		});

		return fd;
	},

	// ---------------------------------------------------------------------------
	// Reset
	// ---------------------------------------------------------------------------
	reset: () => {
		cleanupEntries(get().entries);
		set(initialState);
	},
}));

// ============================================================================
// Selectors (for optimized re-renders)
// ============================================================================

export const selectCurrentStep = (state: UploadFormStore) => state.currentStep;
export const selectCurrentStepConfig = (state: UploadFormStore) => STEPS[state.currentStep];
export const selectFormData = (state: UploadFormStore) => state.formData;
export const selectEntries = (state: UploadFormStore) => state.entries;
export const selectProjectData = (state: UploadFormStore) => state.formData.project;
export const selectTeamData = (state: UploadFormStore) => state.formData.team;
