"use client";

import { useDropzone } from "react-dropzone";
import styles from "./Upload.module.css";

type DropzoneProps = {
	onDrop: (files: File[]) => void;
};

export default function Dropzone({ onDrop }: DropzoneProps) {
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		multiple: true,
		accept: {
			"image/jpeg": [".jpg"],
			"image/png": [".png"],
			"image/webp": [".webp"],
		},
        maxSize: 10 * 1024 * 1024, // 10 MB
        maxFiles: 100,
	});

	return (    
		<div
			{...getRootProps({
				className: `${styles.dropzone} ${isDragActive ? styles.dropzoneActive : ""}`,
			})}
		>
			<input {...getInputProps()} />
			<p className={styles.label}>
				{isDragActive
					? "Drop the files here"
					: "Drag & drop .jpg, .png, .webp files here, or click to select"}
			</p>
		</div>
	);
}
