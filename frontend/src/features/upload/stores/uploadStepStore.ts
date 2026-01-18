import { create } from "zustand";
import { STEPS } from "../types/UploadStep";

type UploadStepState = {
	currentStep: number;
};

type UploadStepActions = {
	nextStep: () => void;
	prevStep: () => void;
	goToStep: (step: number) => void;
	reset: () => void;
};

type UploadStepStore = UploadStepState & UploadStepActions;

const initialState: UploadStepState = {
	currentStep: 0,
};

export const useUploadStepStore = create<UploadStepStore>((set, get) => ({
	...initialState,

	nextStep: () => {
		const { currentStep } = get();
		if (currentStep < STEPS.length - 1) {
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

	reset: () => {
		set(initialState);
	},
}));

// Selectors
export const selectCurrentStep = (state: UploadStepStore) => state.currentStep;
export const selectCurrentStepConfig = (state: UploadStepStore) =>
	STEPS[state.currentStep];
export const selectIsFirstStep = (state: UploadStepStore) =>
	state.currentStep === 0;
export const selectIsLastStep = (state: UploadStepStore) =>
	state.currentStep === STEPS.length - 1;
