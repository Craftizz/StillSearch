import type { UploadImageEntry } from './UploadImageEntry';

export type ProjectData = {
    title: string;
    category: string;
    // TODO: ADD MORE FIELDS
}

export type TeamData = {
    director: string;
    cinematographer: string;
    // TODO: ADD MORE FIELDS
}

export type UploadFormData = {
    projectData: ProjectData;
    teamData: TeamData;
}

export type UploadFormState = {
    currentStep: number;
    formData: UploadFormData;
    images: UploadImageEntry[];
}
