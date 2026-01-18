import { useCallback, useMemo } from "react";
import { useUploadEntriesStore } from "../stores/uploadEntriesStore";
import { useUploadFormDataStore } from "../stores/uploadFormDataStore";
import { useUploadStepStore } from "../stores/uploadStepStore";
import { STEPS } from "../types/UploadStep";
import { buildFormData } from "../utils/buildFormData";

/**
 * Composite hook that orchestrates all upload form stores.
 * Provides validation, step navigation, and form submission.
 */
export function useUploadForm() {
	// Step store
	const currentStep = useUploadStepStore((s) => s.currentStep);
	const nextStep = useUploadStepStore((s) => s.nextStep);
	const prevStep = useUploadStepStore((s) => s.prevStep);
	const goToStep = useUploadStepStore((s) => s.goToStep);
	const resetStep = useUploadStepStore((s) => s.reset);

	// Form data store
	const formData = useUploadFormDataStore((s) => s.formData);
	const updateProject = useUploadFormDataStore((s) => s.updateProject);
	const updateTeam = useUploadFormDataStore((s) => s.updateTeam);
	const resetFormData = useUploadFormDataStore((s) => s.reset);

	// Entries store
	const entries = useUploadEntriesStore((s) => s.entries);
	const addFiles = useUploadEntriesStore((s) => s.addFiles);
	const updateEntry = useUploadEntriesStore((s) => s.updateEntry);
	const removeEntry = useUploadEntriesStore((s) => s.removeEntry);
	const clearEntries = useUploadEntriesStore((s) => s.clearEntries);

	// Current step config
	const stepConfig = STEPS[currentStep];
	const isFirstStep = currentStep === 0;
	const isLastStep = currentStep === STEPS.length - 1;
	const totalSteps = STEPS.length;

	// Validation per step
	const canProceed = useMemo(() => {
		switch (stepConfig.id) {
			case "project":
				return (
					formData.project.title.trim() !== "" &&
					formData.project.category.trim() !== ""
				);
			case "team":
				// Optional step - can always proceed
				return true;
			case "stills":
				return entries.length > 0;
			case "review":
				return true;
			default:
				return false;
		}
	}, [stepConfig.id, formData.project, entries.length]);

	// Step validation errors (for UI feedback)
	const stepErrors = useMemo(() => {
		const errors: string[] = [];

		switch (stepConfig.id) {
			case "project":
				if (formData.project.title.trim() === "") {
					errors.push("Project title is required");
				}
				if (formData.project.category.trim() === "") {
					errors.push("Category is required");
				}
				break;
			case "stills":
				if (entries.length === 0) {
					errors.push("At least one image is required");
				}
				break;
		}

		return errors;
	}, [stepConfig.id, formData.project, entries.length]);

	// Navigate with validation
	const handleNextStep = useCallback(() => {
		if (canProceed) {
			nextStep();
		}
	}, [canProceed, nextStep]);

	// Build FormData for submission
	const getFormDataForSubmit = useCallback(() => {
		return buildFormData(formData, entries);
	}, [formData, entries]);

	// Reset all stores
	const resetAll = useCallback(() => {
		resetStep();
		resetFormData();
		clearEntries();
	}, [resetStep, resetFormData, clearEntries]);

	return {
		// Step navigation
		currentStep,
		stepConfig,
		isFirstStep,
		isLastStep,
		totalSteps,
		steps: STEPS,
		nextStep: handleNextStep,
		prevStep,
		goToStep,

		// Validation
		canProceed,
		stepErrors,

		// Form data
		formData,
		updateProject,
		updateTeam,

		// Entries
		entries,
		addFiles,
		updateEntry,
		removeEntry,
		clearEntries,

		// Submission
		getFormDataForSubmit,

		// Reset
		resetAll,
	};
}
